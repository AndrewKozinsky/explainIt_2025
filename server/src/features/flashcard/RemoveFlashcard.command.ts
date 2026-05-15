import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { FlashcardRepository } from 'repo/flashcard.repository'
import { ErrorStatusCode } from 'src/infrastructure/exceptions/errorStatusCode'
import { CustomError } from 'infrastructure/exceptions/customErrors'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'

export class RemoveFlashcardCommand implements ICommand {
	constructor(
		public dto: {
			userId: number
			flashcardId: number
		},
	) {}
}

@CommandHandler(RemoveFlashcardCommand)
export class RemoveFlashcardHandler implements ICommandHandler<RemoveFlashcardCommand, boolean> {
	constructor(private flashcardRepository: FlashcardRepository) {}

	async execute(command: RemoveFlashcardCommand): Promise<boolean> {
		const { userId, flashcardId } = command.dto

		const flashcard = await this.flashcardRepository.getFlashcardById(flashcardId)
		if (!flashcard) {
			throw new CustomError(errorMessage.flashcard.notFound, ErrorStatusCode.NotFound_404)
		}

		if (flashcard.userId !== userId) {
			throw new CustomError(errorMessage.user.userIsNotOwner, ErrorStatusCode.Forbidden_403)
		}

		await this.flashcardRepository.deleteFlashcardById(flashcardId)

		return true
	}
}
