import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { BookChapterRepository } from 'repo/bookChapter/bookChapter.repository'
import { CustomError } from 'infrastructure/exceptions/customErrors'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { ErrorStatusCode } from 'infrastructure/exceptions/errorStatusCode'

type DeleteBookChapterInput = {
	id: number
}

export class DeleteBookChapterCommand implements ICommand {
	constructor(
		public userId: number,
		public deleteBookChapterInput: DeleteBookChapterInput,
	) {}
}

@CommandHandler(DeleteBookChapterCommand)
export class DeleteBookChapterHandler implements ICommandHandler<DeleteBookChapterCommand> {
	constructor(private bookChapterRepository: BookChapterRepository) {}

	async execute(command: DeleteBookChapterCommand) {
		const { userId, deleteBookChapterInput } = command

		const bookChapter = await this.bookChapterRepository.getBookChapter({
			bookType: 'private',
			id: deleteBookChapterInput.id,
		})
		if (!bookChapter) {
			throw new CustomError(errorMessage.bookChapter.notFound, ErrorStatusCode.NotFound_404)
		}

		if (bookChapter.book.userId !== userId) {
			throw new CustomError(errorMessage.user.isNotOwner, ErrorStatusCode.Forbidden_403)
		}

		await this.bookChapterRepository.deleteBookChapterById(deleteBookChapterInput.id)

		return true
	}
}
