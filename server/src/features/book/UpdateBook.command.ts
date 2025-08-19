import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { CustomGraphQLError } from '../../infrastructure/exceptions/customErrors'
import { ErrorCode } from '../../infrastructure/exceptions/errorCode'
import { errorMessage } from '../../infrastructure/exceptions/errorMessage'
import { BookQueryRepository } from '../../repo/book.queryRepository'
import { BookRepository } from '../../repo/book.repository'

type UpdateBookInput = {
	id: number
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

		const bookForUpdating = await this.bookQueryRepository.getBookById(updateBookInput.id)
		console.log({ bookForUpdating })
		if (!bookForUpdating) {
			throw new CustomGraphQLError(errorMessage.book.notFound, ErrorCode.NotFound_404)
		}

		if (bookForUpdating.userId !== userId) {
			throw new CustomGraphQLError(errorMessage.userIsNotOwner, ErrorCode.Forbidden_403)
		}

		const book = await this.bookRepository.updateBookById(updateBookInput.id, updateBookInput)
		if (!book) {
			throw new CustomGraphQLError(errorMessage.unknownDbError, ErrorCode.InternalServerError_500)
		}

		return book
	}
}
