import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { AiDialogueQueryRepository } from 'repo/aiDialogue/aiDialogue.queryRepository'
import { AiDialogueRepository } from 'repo/aiDialogue/aiDialogue.repository'
import { AiDialogueMessageRepository } from 'repo/aiDialogue/aiDialogueMessage.repository'
import { AiDialogueClientEvent } from 'types/aiDialogueMessage'
import { CustomError } from 'infrastructure/exceptions/customErrors'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { ErrorStatusCode } from 'infrastructure/exceptions/errorStatusCode'
import { AiDialogueMessageOutModel } from 'models/aiDialogue/aiDialogueMessage.out.model'
import { ActiveAiDialogueGenerationRegistry } from './ActiveAiDialogueGenerationRegistry.service'
import { GenerateAiDialogueTurn } from './GenerateAiDialogueTurn.service'

export class CreateAiDialogueMessageCommand implements ICommand {
	constructor(
		public dto: {
			userId: number
			dialogueId: number
			event: AiDialogueClientEvent
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
	) {}

	async execute(command: CreateAiDialogueMessageCommand): Promise<AiDialogueMessageOutModel> {
		const { userId, dialogueId, event } = command.dto

		const dialogue = await this.aiDialogueRepository.getDialogueById(dialogueId)
		if (!dialogue) {
			throw new CustomError(errorMessage.aiDialogue.notFound, ErrorStatusCode.NotFound_404)
		}
		if (dialogue.user_id !== userId) {
			throw new CustomError(errorMessage.user.isNotOwner, ErrorStatusCode.Forbidden_403)
		}

		// Пока NPC ещё генерирует ответ — новое действие пользователя отклоняем.
		if (this.activeGenerationRegistry.hasActiveForDialogue(dialogueId)) {
			throw new CustomError(errorMessage.aiDialogue.generationAlreadyActive, ErrorStatusCode.BadRequest_400)
		}

		const message = await this.aiDialogueMessageRepository.createMessage({ dialogueId, event })

		const messageOut = await this.aiDialogueQueryRepository.getMessageById(message.id)
		if (!messageOut) {
			throw new CustomError(errorMessage.unknownError, ErrorStatusCode.InternalServerError_500)
		}

		// Генерация ответа NPC — fire-and-forget, результат доедет через SSE.
		this.generateAiDialogueTurn.generate(dialogueId).catch((error) => {
			console.log('AiDialogue: failed to trigger turn after user message', { dialogueId, error })
		})

		return messageOut
	}
}
