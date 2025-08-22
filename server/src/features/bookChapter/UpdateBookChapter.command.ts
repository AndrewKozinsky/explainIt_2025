import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { CustomGraphQLError } from '../../infrastructure/exceptions/customErrors'
import { ErrorCode } from '../../infrastructure/exceptions/errorCode'
import { errorMessage } from '../../infrastructure/exceptions/errorMessage'
import { BookQueryRepository } from '../../repo/book.queryRepository'
import { BookRepository } from '../../repo/book.repository'

type UpdateBookChapterInput = {
	id: number
	bookId: number
	name?: null | string
	header?: null | string
	content?: null | string
	note?: null | string
}

export class UpdateBookChapterCommand implements ICommand {
	constructor(
		public userId: number,
		public updateBookChapterInput: UpdateBookChapterInput,
	) {}
}

@CommandHandler(UpdateBookChapterCommand)
export class UpdateBookChapterHandler implements ICommandHandler<UpdateBookChapterCommand> {
	constructor(
		private bookRepository: BookRepository,
		private bookQueryRepository: BookQueryRepository,
	) {}

	async execute(command: UpdateBookChapterCommand) {
		/*const { userId, updateBookChapterInput } = command

		const bookForUpdating = await this.bookQueryRepository.getBookById(updateBookChapterInput.id)
		if (!bookForUpdating) {
			throw new CustomGraphQLError(errorMessage.book.notFound, ErrorCode.NotFound_404)
		}

		if (bookForUpdating.userId !== userId) {
			throw new CustomGraphQLError(errorMessage.userIsNotOwner, ErrorCode.Forbidden_403)
		}

		const book = await this.bookRepository.updateBookById(updateBookChapterInput.id, updateBookChapterInput)
		if (!book) {
			throw new CustomGraphQLError(errorMessage.unknownDbError, ErrorCode.InternalServerError_500)
		}

		return this.bookQueryRepository.getBookById(book.id)*/
	}
}
