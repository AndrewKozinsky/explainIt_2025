import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { AiDialogueQueryRepository } from 'repo/aiDialogue/aiDialogue.queryRepository'
import { AiDialogueRepository } from 'repo/aiDialogue/aiDialogue.repository'
import { AiDialogueOutModel } from 'models/aiDialogue/aiDialogue.out.model'
import { CustomError } from 'infrastructure/exceptions/customErrors'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { ErrorStatusCode } from 'infrastructure/exceptions/errorStatusCode'

export class GetAiDialogueCommand implements ICommand {
	constructor(
		public userId: number,
		public id: number,
	) {}
}

@CommandHandler(GetAiDialogueCommand)
export class GetAiDialogueHandler implements ICommandHandler<GetAiDialogueCommand, AiDialogueOutModel> {
	constructor(
		private aiDialogueRepository: AiDialogueRepository,
		private aiDialogueQueryRepository: AiDialogueQueryRepository,
	) {}

	async execute(command: GetAiDialogueCommand): Promise<AiDialogueOutModel> {
		const { userId, id } = command

		const dialogue = await this.aiDialogueRepository.getDialogueById(id)
		if (!dialogue) {
			throw new CustomError(errorMessage.aiDialogue.notFound, ErrorStatusCode.NotFound_404)
		}

		if (dialogue.user_id !== userId) {
			throw new CustomError(errorMessage.user.isNotOwner, ErrorStatusCode.Forbidden_403)
		}

		const dialogueOut = await this.aiDialogueQueryRepository.getDialogueById(id)
		if (!dialogueOut) {
			throw new CustomError(errorMessage.aiDialogue.notFound, ErrorStatusCode.NotFound_404)
		}

		return dialogueOut
	}
}
