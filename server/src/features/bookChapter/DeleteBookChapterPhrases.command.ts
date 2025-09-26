import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { BookChapterPhraseRepository } from 'src/repo/bookChapterPhrase.repository'

export class DeleteBookChapterPhrasesCommand implements ICommand {
	constructor(public bookChapterId: number) {}
}

@CommandHandler(DeleteBookChapterPhrasesCommand)
export class DeleteBookChapterPhrasesHandler implements ICommandHandler<DeleteBookChapterPhrasesCommand> {
	constructor(private bookChapterPhraseRepository: BookChapterPhraseRepository) {}

	async execute(command: DeleteBookChapterPhrasesCommand) {
		const { bookChapterId } = command

		await this.bookChapterPhraseRepository.deleteBookChapterPhrases(bookChapterId)

		return true
	}
}
