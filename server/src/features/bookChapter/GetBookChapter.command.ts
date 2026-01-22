import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { BookChapterQueryRepository } from 'repo/bookChapter.queryRepository'
import { BookChapterRepository } from 'repo/bookChapter.repository'
import { CustomGraphQLError } from 'infrastructure/exceptions/customErrors'
import { ErrorCode } from 'infrastructure/exceptions/errorCode'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'

type GetBookChapterInput = {
	bookType: 'private' | 'public'
	id: number
}

export class GetBookChapterCommand implements ICommand {
	constructor(
		public getBookChapterInput: GetBookChapterInput,
		public userId?: number,
	) {}
}

@CommandHandler(GetBookChapterCommand)
export class GetBookChapterHandler implements ICommandHandler<GetBookChapterCommand> {
	constructor(
		private bookChapterQueryRepository: BookChapterQueryRepository,
		private bookChapterRepository: BookChapterRepository,
	) {}

	async execute(command: GetBookChapterCommand) {
		const { userId, getBookChapterInput } = command

		const bookChapter = await this.bookChapterRepository.getBookChapter({
			bookType: getBookChapterInput.bookType,
			id: getBookChapterInput.id,
		})

		if (!bookChapter) {
			throw new CustomGraphQLError(errorMessage.bookChapter.notFound, ErrorCode.NotFound_404)
		}

		if (bookChapter.book.userId && bookChapter.book.userId !== userId) {
			throw new CustomGraphQLError(errorMessage.userIsNotOwner, ErrorCode.Forbidden_403)
		}

		const getBookChapter = await this.bookChapterRepository.getBookChapter({
			bookType: getBookChapterInput.bookType,
			id: getBookChapterInput.id,
		})
		if (!getBookChapter) {
			throw new CustomGraphQLError(errorMessage.unknownDbError, ErrorCode.InternalServerError_500)
		}

		return this.bookChapterQueryRepository.getBookChapterById(getBookChapter.id)
	}
}
