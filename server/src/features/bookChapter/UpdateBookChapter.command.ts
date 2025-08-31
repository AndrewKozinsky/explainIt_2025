import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { CustomGraphQLError } from '../../infrastructure/exceptions/customErrors'
import { ErrorCode } from '../../infrastructure/exceptions/errorCode'
import { errorMessage } from '../../infrastructure/exceptions/errorMessage'
import { BookChapterQueryRepository } from 'src/repo/bookChapter.queryRepository'
import { BookChapterRepository } from 'src/repo/bookChapter.repository'

type UpdateBookChapterInput = {
	id: number
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
		private bookChapterQueryRepository: BookChapterQueryRepository,
		private bookChapterRepository: BookChapterRepository,
	) {}

	async execute(command: UpdateBookChapterCommand) {
		const { userId, updateBookChapterInput } = command

		const bookChapter = await this.bookChapterRepository.getBookChapterById(updateBookChapterInput.id)
		if (!bookChapter) {
			throw new CustomGraphQLError(errorMessage.bookChapter.notFound, ErrorCode.NotFound_404)
		}

		if (bookChapter.book.userId !== userId) {
			throw new CustomGraphQLError(errorMessage.userIsNotOwner, ErrorCode.Forbidden_403)
		}

		const updatedBookChapter = await this.bookChapterRepository.updateBookChapterById(
			updateBookChapterInput.id,
			updateBookChapterInput,
		)
		if (!updatedBookChapter) {
			throw new CustomGraphQLError(errorMessage.unknownDbError, ErrorCode.InternalServerError_500)
		}

		return this.bookChapterQueryRepository.getBookChapterById(updatedBookChapter.id)
	}
}
