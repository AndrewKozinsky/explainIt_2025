import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { BookQueryRepository } from 'repo/book/book.queryRepository'
import { BookRepository } from 'repo/book/book.repository'
import { CustomError } from 'infrastructure/exceptions/customErrors'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { ErrorStatusCode } from 'infrastructure/exceptions/errorStatusCode'

type DeleteBookInput = {
	id: number
}

export class DeletePrivateBookCommand implements ICommand {
	constructor(
		public userId: number,
		public deleteBookInput: DeleteBookInput,
	) {}
}

@CommandHandler(DeletePrivateBookCommand)
export class DeleteBookHandler implements ICommandHandler<DeletePrivateBookCommand> {
	constructor(
		private bookRepository: BookRepository,
		private bookQueryRepository: BookQueryRepository,
	) {}

	async execute(command: DeletePrivateBookCommand) {
		const { userId, deleteBookInput } = command

		// Check if the book exists
		const book = await this.bookQueryRepository.getBookById(deleteBookInput.id)
		if (!book) {
			throw new CustomError(errorMessage.book.notFound, ErrorStatusCode.NotFound_404)
		}

		// Throw an error if this user is not the owner of the book
		if (book.userId !== userId) {
			throw new CustomError(errorMessage.user.isNotOwner, ErrorStatusCode.Forbidden_403)
		}

		await this.bookRepository.deleteBookById(deleteBookInput.id)

		return true
	}
}
