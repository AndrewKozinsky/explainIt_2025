import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { AiDialogueQueryRepository } from 'repo/aiDialogue/aiDialogue.queryRepository'
import { AiDialogueRepository } from 'repo/aiDialogue/aiDialogue.repository'
import { AiDialogueMessageRepository } from 'repo/aiDialogue/aiDialogueMessage.repository'
import { AiDialogueClientEvent, AiDialogueEvent } from 'types/aiDialogueMessage'
import { UserBalanceService } from 'features/billing/UserBalance.service'
import { CustomError } from 'infrastructure/exceptions/customErrors'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { ErrorStatusCode } from 'infrastructure/exceptions/errorStatusCode'
import { AiDialogueMessageOutModel } from 'models/aiDialogue/aiDialogueMessage.out.model'
import { ActiveAiDialogueGenerationRegistry } from './ActiveAiDialogueGenerationRegistry.service'
import { GenerateAiDialogueTurn } from './GenerateAiDialogueTurn.service'
import { AiDialogueUserMessageAnalysis } from './messageCheck/AiDialogueUserMessageAnalysis.service'

export class CreateAiDialogueMessageCommand implements ICommand {
	constructor(
		public dto: {
			userId: number
			dialogueId: number
			event: AiDialogueClientEvent
			requestId?: string
		},
	) {}
}

@CommandHandler(CreateAiDialogueMessageCommand)
export class CreateAiDialogueMessageHandler implements ICommandHandler<
	CreateAiDialogueMessageCommand,
	AiDialogueMessageOutModel
> {
	constructor(
		private aiDialogueRepository: AiDialogueRepository,
		private aiDialogueMessageRepository: AiDialogueMessageRepository,
		private aiDialogueQueryRepository: AiDialogueQueryRepository,
		private activeGenerationRegistry: ActiveAiDialogueGenerationRegistry,
		private generateAiDialogueTurn: GenerateAiDialogueTurn,
		private userBalanceService: UserBalanceService,
		private messageAnalysis: AiDialogueUserMessageAnalysis,
	) {}

	async execute(command: CreateAiDialogueMessageCommand): Promise<AiDialogueMessageOutModel> {
		const { userId, dialogueId, event, requestId } = command.dto

		const dialogue = await this.aiDialogueRepository.getDialogueById(dialogueId)
		if (!dialogue) {
			throw new CustomError(errorMessage.aiDialogue.notFound, ErrorStatusCode.NotFound_404)
		}

		if (dialogue.user_id !== userId) {
			throw new CustomError(errorMessage.user.isNotOwner, ErrorStatusCode.Forbidden_403)
		}

		if (requestId) {
			const existing = await this.aiDialogueQueryRepository.getMessageByRequestId(dialogueId, requestId)
			if (existing) {
				return this.confirmRetry(existing, event)
			}
		}

		// Анализ и генерация хода используют один слот диалога.
		if (this.activeGenerationRegistry.hasActiveForDialogue(dialogueId)) {
			throw new CustomError(errorMessage.aiDialogue.generationAlreadyActive, ErrorStatusCode.BadRequest_400)
		}

		this.activeGenerationRegistry.register(dialogueId)
		let messageOut: AiDialogueMessageOutModel

		try {
			await this.userBalanceService.ensurePositiveBalanceOrThrow(userId, 'aiDialogue')

			let eventToSave: AiDialogueEvent

			if (event.type === 'userActions' && dialogue.mode !== 'exam') {
				eventToSave = await this.messageAnalysis.review(dialogue, event.actions)
				await this.userBalanceService.ensurePositiveBalanceOrThrow(userId, 'aiDialogue')
			} else {
				eventToSave = event
			}

			const message = await this.aiDialogueMessageRepository.createMessage({
				dialogueId,
				event: eventToSave,
				requestId,
			})

			if (!message) {
				const existing =
					requestId && (await this.aiDialogueQueryRepository.getMessageByRequestId(dialogueId, requestId))
				if (existing) return this.confirmRetry(existing, event)

				throw new CustomError(errorMessage.unknownError, ErrorStatusCode.InternalServerError_500)
			}

			messageOut = this.aiDialogueQueryRepository.mapDbMessageToOutModel(message)
		} finally {
			this.activeGenerationRegistry.unregister(dialogueId)
		}

		// Генерация ответа NPC — fire-and-forget, результат доедет через SSE.
		this.generateAiDialogueTurn.generate(dialogueId).catch((error) => {
			console.log('AiDialogue: failed to trigger turn after user message', { dialogueId, error })
		})

		return messageOut
	}

	private confirmRetry(message: AiDialogueMessageOutModel, event: AiDialogueClientEvent): AiDialogueMessageOutModel {
		if (this.matchesOriginalSubmission(message.payload, event)) return message

		throw new CustomError(errorMessage.aiDialogue.messageRequestIdReused, ErrorStatusCode.BadRequest_400)
	}

	private matchesOriginalSubmission(saved: AiDialogueEvent, submitted: AiDialogueClientEvent): boolean {
		if (submitted.type === 'userAvoidsNPC') return saved.type === submitted.type
		if (saved.type !== 'userActions' || saved.actions.length !== submitted.actions.length) return false

		return submitted.actions.every(
			({ type, content }, index) =>
				type === saved.actions[index].type &&
				content === (saved.textReview?.[index]?.originalText ?? saved.actions[index].content),
		)
	}
}
