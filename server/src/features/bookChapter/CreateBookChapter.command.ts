import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { BookChapterQueryRepository } from 'repo/bookChapter.queryRepository'
import { BookChapterRepository } from 'repo/bookChapter.repository'
import { BookPrivateQueryRepository } from 'repo/bookPrivate.queryRepository'
import { BookPublicRepository } from 'repo/bookPublic.repository'
import { CustomGraphQLError } from 'infrastructure/exceptions/customErrors'
import { ErrorCode } from 'infrastructure/exceptions/errorCode'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'

export type CreateBookChapterInput = {
	bookType: 'public' | 'private'
	bookId: number
	name?: null | string
	header?: null | string
	content?: null | string
	note?: null | string
}

export class CreateBookChapterCommand implements ICommand {
	constructor(
		public userId: null | number,
		public createBookChapterInput: CreateBookChapterInput,
	) {}
}

@CommandHandler(CreateBookChapterCommand)
export class CreateBookChapterHandler implements ICommandHandler<CreateBookChapterCommand> {
	constructor(
		private bookQueryRepository: BookPrivateQueryRepository,
		private bookPublicRepository: BookPublicRepository,
		private bookChapterRepository: BookChapterRepository,
		private bookChapterQueryRepository: BookChapterQueryRepository,
	) {}

	async execute(command: CreateBookChapterCommand) {
		const { userId, createBookChapterInput } = command

		const isBookPublic = createBookChapterInput.bookType === 'public'
		let bookUserId: null | number = null

		if (isBookPublic) {
			// Check if the book exists
			const bookForChapter = await this.bookPublicRepository.getBook({ id: createBookChapterInput.bookId })
			if (!bookForChapter) {
				throw new CustomGraphQLError(errorMessage.book.notFound, ErrorCode.NotFound_404)
			}
		} else {
			// Check if the book exists
			const bookForChapter = await this.bookQueryRepository.getBookById(createBookChapterInput.bookId)
			if (!bookForChapter) {
				throw new CustomGraphQLError(errorMessage.book.notFound, ErrorCode.NotFound_404)
			}

			bookUserId = bookForChapter.userId
		}

		// Throw an error if this user is not the owner of the book
		if (!isBookPublic && userId !== bookUserId) {
			throw new CustomGraphQLError(errorMessage.userIsNotOwner, ErrorCode.Forbidden_403)
		}

		const newBookChapter = await this.bookChapterRepository.createBookChapter(createBookChapterInput)
		if (!newBookChapter) {
			throw new CustomGraphQLError(errorMessage.bookChapter.notCreated, ErrorCode.InternalServerError_500)
		}

		return this.bookChapterQueryRepository.getBookChapterById(newBookChapter.id)
	}
}
