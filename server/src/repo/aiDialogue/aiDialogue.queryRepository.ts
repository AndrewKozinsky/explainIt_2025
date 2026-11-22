import { getExamMedalUrl } from 'features/aiDialogue/exam/aiDialogueMedal'
import { Injectable } from '@nestjs/common'
import { AiDialogueScenarioQueryRepository } from 'repo/aiDialogueScenario/aiDialogueScenario.queryRepository'
import { AiDialogueEvent } from 'types/aiDialogueMessage'
import { Language } from 'utils/languages'
import { PrismaService } from 'db/prisma.service'
import CatchDbError from 'infrastructure/exceptions/CatchDBErrors'
import { AiDialogueOutModel } from 'models/aiDialogue/aiDialogue.out.model'
import { AiDialogueMessageOutModel } from 'models/aiDialogue/aiDialogueMessage.out.model'
import { Prisma } from 'prisma/generated/client'

type AiDialogueDb = Prisma.AiDialogueGetPayload<{ include: { scenario: true } }>
type AiDialogueMessageDb = Prisma.AiDialogueMessageGetPayload<{}>

@Injectable()
export class AiDialogueQueryRepository {
	constructor(
		private prisma: PrismaService,
		private aiDialogueScenarioQueryRepository: AiDialogueScenarioQueryRepository,
	) {}

	/** @param locale язык интерфейса, на котором возвращаются тексты сценария. */
	@CatchDbError()
	async getDialogueById(id: number, locale: Language): Promise<null | AiDialogueOutModel> {
		const dialogue = await this.prisma.aiDialogue.findUnique({
			where: { id },
			include: { scenario: true },
		})
		if (!dialogue) return null

		return this.mapDbToOutModel(dialogue, locale)
	}

	// Возвращает все сообщения диалога в хронологическом порядке.
	@CatchDbError()
	async getMessagesByDialogueId(dialogueId: number): Promise<AiDialogueMessageOutModel[]> {
		const messages = await this.prisma.aiDialogueMessage.findMany({
			where: { dialogue_id: dialogueId },
			orderBy: { id: 'asc' },
		})

		return this.withExamMedals(
			dialogueId,
			messages.map((message) => this.mapDbMessageToOutModel(message)),
		)
	}

	@CatchDbError()
	async getMessageById(messageId: number): Promise<null | AiDialogueMessageOutModel> {
		const message = await this.prisma.aiDialogueMessage.findUnique({ where: { id: messageId } })
		if (!message) return null

		return (await this.withExamMedals(message.dialogue_id, [this.mapDbMessageToOutModel(message)]))[0]
	}

	@CatchDbError()
	async getMessageByRequestId(dialogueId: number, requestId: string): Promise<AiDialogueMessageOutModel | null> {
		const message = await this.prisma.aiDialogueMessage.findUnique({
			where: { dialogue_id_request_id: { dialogue_id: dialogueId, request_id: requestId } },
		})

		return message ? this.mapDbMessageToOutModel(message) : null
	}

	mapDbToOutModel(dbDialogue: AiDialogueDb, locale: Language): AiDialogueOutModel {
		return {
			id: dbDialogue.id,
			scenario: this.aiDialogueScenarioQueryRepository.mapDbToOutModel(dbDialogue.scenario, locale),
			sourceLanguageCode: dbDialogue.source_language_code,
			targetLanguageCode: dbDialogue.target_language_code,
			cefrLevel: dbDialogue.cefr_level,
			mode: dbDialogue.mode,
			illustrationStyleId: dbDialogue.illustration_style_id,
			createdAt: dbDialogue.created_at.toISOString(),
			updatedAt: dbDialogue.updated_at.toISOString(),
		}
	}

	mapDbMessageToOutModel(dbMessage: AiDialogueMessageDb): AiDialogueMessageOutModel {
		return {
			id: dbMessage.id,
			dialogueId: dbMessage.dialogue_id,
			payload: this.deserializeEvent(dbMessage),
			createdAt: dbMessage.created_at.toISOString(),
		}
	}

	private async withExamMedals(
		dialogueId: number,
		messages: AiDialogueMessageOutModel[],
	): Promise<AiDialogueMessageOutModel[]> {
		if (!messages.some(({ payload }) => payload.type === 'examResult')) return messages
		const dialogue = await this.prisma.aiDialogue.findUnique({
			where: { id: dialogueId },
			select: { scenario: { select: { medal_s3_keys: true } } },
		})
		return messages.map((message) =>
			message.payload.type === 'examResult'
				? {
						...message,
						payload: {
							...message.payload,
							medalUrl: getExamMedalUrl(dialogue?.scenario.medal_s3_keys, message.payload.level),
						},
					}
				: message,
		)
	}

	// Восстанавливает событие из колонки type и JSON-строки payload
	// (обратная операция к AiDialogueMessageRepository.createMessage).
	private deserializeEvent(dbMessage: AiDialogueMessageDb): AiDialogueEvent {
		const { wordMapRequestId: _requestId, ...body } = JSON.parse(dbMessage.payload) as Omit<
			AiDialogueEvent,
			'type'
		> & { wordMapRequestId?: string }

		return { type: dbMessage.type, ...body } as AiDialogueEvent
	}
}
