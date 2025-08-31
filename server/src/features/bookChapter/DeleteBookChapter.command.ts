import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { CustomGraphQLError } from '../../infrastructure/exceptions/customErrors'
import { ErrorCode } from '../../infrastructure/exceptions/errorCode'
import { errorMessage } from '../../infrastructure/exceptions/errorMessage'
import { BookChapterRepository } from 'src/repo/bookChapter.repository'

type DeleteBookChapterInput = {
	id: number
}

export class DeleteBookChapterCommand implements ICommand {
	constructor(
		public userId: number,
		public deleteBookChapterInput: DeleteBookChapterInput,
	) {}
}

@CommandHandler(DeleteBookChapterCommand)
export class DeleteBookChapterHandler implements ICommandHandler<DeleteBookChapterCommand> {
	constructor(private bookChapterRepository: BookChapterRepository) {}

	async execute(command: DeleteBookChapterCommand) {
		const { userId, deleteBookChapterInput } = command

		const bookChapter = await this.bookChapterRepository.getBookChapterById(deleteBookChapterInput.id)
		if (!bookChapter) {
			throw new CustomGraphQLError(errorMessage.bookChapter.notFound, ErrorCode.NotFound_404)
		}

		if (bookChapter.book.userId !== userId) {
			throw new CustomGraphQLError(errorMessage.userIsNotOwner, ErrorCode.Forbidden_403)
		}

		await this.bookChapterRepository.deleteBookChapterById(deleteBookChapterInput.id)

		return true
	}
}
