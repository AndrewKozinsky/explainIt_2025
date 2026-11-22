import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { AiDialogueQueryRepository } from 'repo/aiDialogue/aiDialogue.queryRepository'
import { AiDialogueRepository } from 'repo/aiDialogue/aiDialogue.repository'
import { AiDialogueMessageRepository } from 'repo/aiDialogue/aiDialogueMessage.repository'
import { DEFAULT_SMART_AI_MODEL } from 'types/AIModels'
import { UserBalanceService } from 'features/billing/UserBalance.service'
import { CustomError } from 'infrastructure/exceptions/customErrors'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { ErrorStatusCode } from 'infrastructure/exceptions/errorStatusCode'
import { LlmAdapterService } from 'infrastructure/llmProviderAdapter/LlmAdapter.service'
import { AiDialogueMessageOutModel } from 'models/aiDialogue/aiDialogueMessage.out.model'
import { ActiveAiDialogueGenerationRegistry } from '../ActiveAiDialogueGenerationRegistry.service'
import { AiDialogueSseHub } from '../AiDialogueSseHub.service'
import { buildExamPrompt, parseExamReport } from './aiDialogueExam'

export class CheckAiDialogueExamCommand {
	constructor(
		public userId: number,
		public dialogueId: number,
	) {}
}

@CommandHandler(CheckAiDialogueExamCommand)
export class CheckAiDialogueExamHandler implements ICommandHandler<
	CheckAiDialogueExamCommand,
	AiDialogueMessageOutModel
> {
	private inFlight = new Map<number, Promise<AiDialogueMessageOutModel>>()
	constructor(
		private dialogueRepository: AiDialogueRepository,
		private query: AiDialogueQueryRepository,
		private messages: AiDialogueMessageRepository,
		private llm: LlmAdapterService,
		private balance: UserBalanceService,
		private registry: ActiveAiDialogueGenerationRegistry,
		private hub: AiDialogueSseHub,
	) {}

	async execute({ userId, dialogueId }: CheckAiDialogueExamCommand): Promise<AiDialogueMessageOutModel> {
		const dialogue = await this.dialogueRepository.getDialogueById(dialogueId)
		if (!dialogue) throw new CustomError(errorMessage.aiDialogue.notFound, ErrorStatusCode.NotFound_404)
		if (dialogue.user_id !== userId)
			throw new CustomError(errorMessage.user.isNotOwner, ErrorStatusCode.Forbidden_403)
		if (dialogue.mode !== 'exam')
			throw new CustomError(errorMessage.aiDialogue.examOnly, ErrorStatusCode.BadRequest_400)
		const pending = this.inFlight.get(dialogueId)
		if (pending) return pending
		const work = this.check(dialogue)
		this.inFlight.set(dialogueId, work)
		try {
			return await work
		} finally {
			this.inFlight.delete(dialogueId)
		}
	}

	private async check(
		dialogue: NonNullable<Awaited<ReturnType<AiDialogueRepository['getDialogueById']>>>,
	): Promise<AiDialogueMessageOutModel> {
		const history = await this.query.getMessagesByDialogueId(dialogue.id)
		const existing = history.find(({ payload }) => payload.type === 'examResult')
		if (existing) return existing
		if (this.registry.hasActiveForDialogue(dialogue.id))
			throw new CustomError(errorMessage.aiDialogue.generationAlreadyActive, ErrorStatusCode.BadRequest_400)
		this.registry.register(dialogue.id)

		try {
			await this.balance.ensurePositiveBalanceOrThrow(dialogue.user_id, 'aiDialogue')

			const output = await this.llm.generate({
				model: DEFAULT_SMART_AI_MODEL,
				messages: buildExamPrompt(history, dialogue.source_language_code, dialogue.target_language_code),
				responseFormat: 'json_object',
				timeoutMs: 120_000,
			})

			await this.balance.chargeLlm({
				userId: dialogue.user_id,
				feature: 'aiDialogue',
				model: output.model,
				usage: output,
			})

			const event = parseExamReport(output.content, history)
			if (!event) {
				throw new CustomError(
					errorMessage.aiDialogue.cannotParseExamResult,
					ErrorStatusCode.InternalServerError_500,
				)
			}

			const saved = await this.messages.createMessage({ dialogueId: dialogue.id, event })
			if (!saved) {
				throw new CustomError(errorMessage.unknownError, ErrorStatusCode.InternalServerError_500)
			}

			const result = await this.query.getMessageById(saved.id)
			if (!result) throw new CustomError(errorMessage.unknownError, ErrorStatusCode.InternalServerError_500)
			this.hub.publishDialogueEvent(dialogue.id, { data: { type: 'message', message: result } })

			return result
		} finally {
			this.registry.unregister(dialogue.id)
		}
	}
}
