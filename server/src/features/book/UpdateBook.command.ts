import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { CustomGraphQLError } from '../../infrastructure/exceptions/customErrors'
import { ErrorCode } from '../../infrastructure/exceptions/errorCode'
import { errorMessage } from '../../infrastructure/exceptions/errorMessage'
import { BookQueryRepository } from '../../repo/book.queryRepository'
import { BookRepository } from '../../repo/book.repository'

type UpdateBookInput = {
	bookId: number
	author: null | string
	name: null | string
	note: null | string
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

		// const book = await this.bookRepository.getBookById(updateBookInput.bookId)
		/*if (!book) {
			throw new CustomGraphQLError(errorMessage.book.notFound, ErrorCode.NotFound_404)
		}*/

		// const newBook = await this.bookRepository.updateBookById({ userId, ...updateBookInput })
		/*if (!newBook) {
			throw new CustomGraphQLError(errorMessage.book.notUpdated, ErrorCode.InternalServerError_500)
		}*/

		// return this.bookQueryRepository.getBookById(newBook.id)
	}
}
