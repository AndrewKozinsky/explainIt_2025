import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { CustomGraphQLError } from 'infrastructure/exceptions/customErrors'
import { ErrorCode } from 'infrastructure/exceptions/errorCode'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { BookChapterRepository } from 'src/repo/bookChapter.repository'
import { BookChapterPhraseRepository } from 'src/repo/bookChapterPhrase.repository'

type DeleteBookChapterPhrasesInput = {
	userId: number
	bookChapterId: number
}

export class DeleteBookChapterPhrasesCommand implements ICommand {
	constructor(public input: DeleteBookChapterPhrasesInput) {}
}

@CommandHandler(DeleteBookChapterPhrasesCommand)
export class DeleteBookChapterPhrasesHandler implements ICommandHandler<DeleteBookChapterPhrasesCommand> {
	constructor(
		private bookChapterRepository: BookChapterRepository,
		private bookChapterPhraseRepository: BookChapterPhraseRepository,
	) {}

	async execute(command: DeleteBookChapterPhrasesCommand) {
		const { userId, bookChapterId } = command.input

		const bookChapter = await this.bookChapterRepository.getBookChapterById(bookChapterId)
		if (!bookChapter) {
			throw new CustomGraphQLError(errorMessage.bookChapter.notFound, ErrorCode.NotFound_404)
		}

		if (bookChapter.book.userId !== userId) {
			throw new CustomGraphQLError(errorMessage.userIsNotOwner, ErrorCode.Forbidden_403)
		}

		await this.bookChapterPhraseRepository.deleteBookChapterPhrases(bookChapterId)

		return true
	}
}
