import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { AiDialogueRepository } from 'repo/aiDialogue/aiDialogue.repository'
import { CustomError } from 'infrastructure/exceptions/customErrors'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { ErrorStatusCode } from 'infrastructure/exceptions/errorStatusCode'

type DeleteAiDialogueInput = {
	id: number
}

export class DeleteAiDialogueCommand implements ICommand {
	constructor(
		public userId: number,
		public deleteAiDialogueInput: DeleteAiDialogueInput,
	) {}
}

@CommandHandler(DeleteAiDialogueCommand)
export class DeleteAiDialogueHandler implements ICommandHandler<DeleteAiDialogueCommand> {
	constructor(private aiDialogueRepository: AiDialogueRepository) {}

	async execute(command: DeleteAiDialogueCommand) {
		const { userId, deleteAiDialogueInput } = command

		const dialogue = await this.aiDialogueRepository.getDialogueById(deleteAiDialogueInput.id)
		if (!dialogue) {
			throw new CustomError(errorMessage.aiDialogue.notFound, ErrorStatusCode.NotFound_404)
		}

		if (dialogue.user_id !== userId) {
			throw new CustomError(errorMessage.user.isNotOwner, ErrorStatusCode.Forbidden_403)
		}

		await this.aiDialogueRepository.deleteDialogueById(deleteAiDialogueInput.id)

		return true
	}
}
