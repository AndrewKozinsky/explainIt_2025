import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { AiDialogueRepository } from 'repo/aiDialogue/aiDialogue.repository'
import { CustomError } from 'infrastructure/exceptions/customErrors'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { ErrorStatusCode } from 'infrastructure/exceptions/errorStatusCode'
import { AiDialogueUserMessageCheckOutModel } from 'models/aiDialogue/aiDialogueUserMessageCheck.out.model'
import { AiDialogueUserMessageAnalysis } from './AiDialogueUserMessageAnalysis.service'

type CheckUserMessageDto = {
	userId: number
	dialogueId: number
	speech?: string | null
	action?: string | null
}

/** Проверяет грамматику и стиль ещё не отправленной реплики и/или действия пользователя. */
export class CheckAiDialogueUserMessageCommand implements ICommand {
	constructor(public dto: CheckUserMessageDto) {}
}

@CommandHandler(CheckAiDialogueUserMessageCommand)
export class CheckAiDialogueUserMessageHandler implements ICommandHandler<
	CheckAiDialogueUserMessageCommand,
	AiDialogueUserMessageCheckOutModel
> {
	constructor(
		private dialogueRepository: AiDialogueRepository,
		private messageAnalysis: AiDialogueUserMessageAnalysis,
	) {}

	async execute({ dto }: CheckAiDialogueUserMessageCommand): Promise<AiDialogueUserMessageCheckOutModel> {
		const dialogue = await this.dialogueRepository.getDialogueById(dto.dialogueId)
		if (!dialogue) throw new CustomError(errorMessage.aiDialogue.notFound, ErrorStatusCode.NotFound_404)

		if (dialogue.user_id !== dto.userId) {
			throw new CustomError(errorMessage.user.isNotOwner, ErrorStatusCode.Forbidden_403)
		}

		const speech = dto.speech?.trim() ?? ''
		const action = dto.action?.trim() ?? ''

		if (!speech && !action) {
			throw new CustomError(errorMessage.aiDialogue.checkTextRequired, ErrorStatusCode.BadRequest_400)
		}

		return this.messageAnalysis.check(dialogue, speech, action)
	}
}
