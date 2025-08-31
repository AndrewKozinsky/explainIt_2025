import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { CustomGraphQLError } from 'infrastructure/exceptions/customErrors'
import { ErrorCode } from 'infrastructure/exceptions/errorCode'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { BookQueryRepository } from 'src/repo/book.queryRepository'
import { BookRepository } from 'src/repo/book.repository'

type UpdateBookInput = {
	id: number
	author?: null | string
	name?: null | string
	note?: null | string
}

export class UpdateBookCommand implements ICommand {
	constructor(
		public userId: number,
		public updateBookInput: UpdateBookInput,
	) {}
}

@CommandHandler(UpdateBookCommand)
export class UpdateBookHandler implements ICommandHandler<UpdateBookCommand> {
	constructor(
		private bookRepository: BookRepository,
		private bookQueryRepository: BookQueryRepository,
	) {}

	async execute(command: UpdateBookCommand) {
		const { userId, updateBookInput } = command

		// Check if the book exists
		const bookForUpdating = await this.bookQueryRepository.getBookById(updateBookInput.id)
		if (!bookForUpdating) {
			throw new CustomGraphQLError(errorMessage.book.notFound, ErrorCode.NotFound_404)
		}

		// Throw an error if this user is not the owner of the book
		if (bookForUpdating.userId !== userId) {
			throw new CustomGraphQLError(errorMessage.userIsNotOwner, ErrorCode.Forbidden_403)
		}

		const book = await this.bookRepository.updateBookById(updateBookInput.id, updateBookInput)
		if (!book) {
			throw new CustomGraphQLError(errorMessage.unknownDbError, ErrorCode.InternalServerError_500)
		}

		return this.bookQueryRepository.getBookById(book.id)
	}
}
