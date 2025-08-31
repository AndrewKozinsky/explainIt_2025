import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { CustomGraphQLError } from 'infrastructure/exceptions/customErrors'
import { ErrorCode } from 'infrastructure/exceptions/errorCode'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { BookChapterQueryRepository } from 'src/repo/bookChapter.queryRepository'
import { BookChapterRepository } from 'src/repo/bookChapter.repository'

type GetBookChapterInput = {
	id: number
}

export class GetBookChapterCommand implements ICommand {
	constructor(
		public userId: number,
		public getBookChapterInput: GetBookChapterInput,
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

		const bookChapter = await this.bookChapterRepository.getBookChapterById(getBookChapterInput.id)
		if (!bookChapter) {
			throw new CustomGraphQLError(errorMessage.bookChapter.notFound, ErrorCode.NotFound_404)
		}

		if (bookChapter.book.userId !== userId) {
			throw new CustomGraphQLError(errorMessage.userIsNotOwner, ErrorCode.Forbidden_403)
		}

		const getBookChapter = await this.bookChapterRepository.getBookChapterById(getBookChapterInput.id)
		if (!getBookChapter) {
			throw new CustomGraphQLError(errorMessage.unknownDbError, ErrorCode.InternalServerError_500)
		}

		return this.bookChapterQueryRepository.getBookChapterById(getBookChapter.id)
	}
}
