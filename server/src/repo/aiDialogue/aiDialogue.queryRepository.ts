import { Injectable } from '@nestjs/common'
import { AiDialogueScenarioQueryRepository } from 'repo/aiDialogueScenario/aiDialogueScenario.queryRepository'
import { AiDialogueEvent } from 'types/aiDialogueMessage'
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

	@CatchDbError()
	async getUserDialogues(userId: number): Promise<AiDialogueOutModel[]> {
		const dialogues = await this.prisma.aiDialogue.findMany({
			where: { user_id: userId },
			include: { scenario: true },
			orderBy: { id: 'desc' },
		})

		return dialogues.map((dialogue) => this.mapDbToOutModel(dialogue))
	}

	@CatchDbError()
	async getDialogueById(id: number): Promise<null | AiDialogueOutModel> {
		const dialogue = await this.prisma.aiDialogue.findUnique({
			where: { id },
			include: { scenario: true },
		})
		if (!dialogue) return null

		return this.mapDbToOutModel(dialogue)
	}

	// Возвращает все сообщения диалога в хронологическом порядке.
	@CatchDbError()
	async getMessagesByDialogueId(dialogueId: number): Promise<AiDialogueMessageOutModel[]> {
		const messages = await this.prisma.aiDialogueMessage.findMany({
			where: { dialogue_id: dialogueId },
			orderBy: { id: 'asc' },
		})

		return messages.map((message) => this.mapDbMessageToOutModel(message))
	}

	@CatchDbError()
	async getMessageById(messageId: number): Promise<null | AiDialogueMessageOutModel> {
		const message = await this.prisma.aiDialogueMessage.findUnique({ where: { id: messageId } })
		if (!message) return null

		return this.mapDbMessageToOutModel(message)
	}

	mapDbToOutModel(dbDialogue: AiDialogueDb): AiDialogueOutModel {
		return {
			id: dbDialogue.id,
			scenario: this.aiDialogueScenarioQueryRepository.mapDbToOutModel(dbDialogue.scenario),
			targetLanguageCode: dbDialogue.target_language_code,
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

	// Восстанавливает событие из колонки type и JSON-строки payload
	// (обратная операция к AiDialogueMessageRepository.createMessage).
	private deserializeEvent(dbMessage: AiDialogueMessageDb): AiDialogueEvent {
		const body = JSON.parse(dbMessage.payload) as Omit<AiDialogueEvent, 'type'>
		return { type: dbMessage.type, ...body } as AiDialogueEvent
	}
}
