import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { CustomGraphQLError } from '../../infrastructure/exceptions/customErrors'
import { ErrorCode } from '../../infrastructure/exceptions/errorCode'
import { errorMessage } from '../../infrastructure/exceptions/errorMessage'
import { BookQueryRepository } from 'src/repo/book.queryRepository'
import { BookChapterQueryRepository } from 'src/repo/bookChapter.queryRepository'
import { BookChapterRepository } from 'src/repo/bookChapter.repository'

export type CreateBookChapterInput = {
	bookId: number
	name?: null | string
	header?: null | string
	content?: null | string
	note?: null | string
}

export class CreateBookChapterCommand implements ICommand {
	constructor(
		public userId: number,
		public createBookChapterInput: CreateBookChapterInput,
	) {}
}

@CommandHandler(CreateBookChapterCommand)
export class CreateBookChapterHandler implements ICommandHandler<CreateBookChapterCommand> {
	constructor(
		private bookQueryRepository: BookQueryRepository,
		private bookChapterRepository: BookChapterRepository,
		private bookChapterQueryRepository: BookChapterQueryRepository,
	) {}

	async execute(command: CreateBookChapterCommand) {
		const { userId, createBookChapterInput } = command

		// Check if the book exists
		const bookForChapter = await this.bookQueryRepository.getBookById(createBookChapterInput.bookId)
		if (!bookForChapter) {
			throw new CustomGraphQLError(errorMessage.book.notFound, ErrorCode.NotFound_404)
		}

		// Throw an error if this user is not the owner of the book
		if (bookForChapter.userId !== userId) {
			throw new CustomGraphQLError(errorMessage.userIsNotOwner, ErrorCode.Forbidden_403)
		}

		const newBookChapter = await this.bookChapterRepository.createBookChapter(createBookChapterInput)
		if (!newBookChapter) {
			throw new CustomGraphQLError(errorMessage.bookChapter.notCreated, ErrorCode.InternalServerError_500)
		}

		return this.bookChapterQueryRepository.getBookChapterById(newBookChapter.id)
	}
}
