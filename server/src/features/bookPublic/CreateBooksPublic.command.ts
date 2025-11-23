import { CommandBus, CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { ChapterData, getBookChapters } from 'src/features/bookPublic/common/common'
import { CreateBookPublicCommand, CreateBookPublicInput } from 'src/features/bookPublic/CreateBookPublic.command'
import { solomonMinesBookData, solomonMinesChapters } from 'src/features/bookPublic/solomonMines/solomonMinesBook'
import { wizardOfOzBookData, wizardOfOzChapters } from 'src/features/bookPublic/wizardOfOz/wizardOfOzBook'
import { CreateBookChapterCommand } from 'features/bookChapter/CreateBookChapter.command'
import { CustomGraphQLError } from 'infrastructure/exceptions/customErrors'
import { ErrorCode } from 'infrastructure/exceptions/errorCode'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { BookChapterRepository } from 'src/repo/bookChapter.repository'
import { BookPublicRepository } from 'src/repo/bookPublic.repository'

export class CreateBooksPublicCommand implements ICommand {
	constructor() {}
}

@CommandHandler(CreateBooksPublicCommand)
export class CreateDefaultBooksHandler implements ICommandHandler<CreateBooksPublicCommand> {
	constructor(
		private commandBus: CommandBus,
		public bookPublicRepository: BookPublicRepository,
		public bookChapterRepository: BookChapterRepository,
	) {}

	async execute() {
		await this.createBookAndChaptersOfNotExists(wizardOfOzBookData, wizardOfOzChapters)
		await this.createBookAndChaptersOfNotExists(solomonMinesBookData, solomonMinesChapters)
	}

	async createBookAndChaptersOfNotExists(bookData: CreateBookPublicInput, chaptersData: ChapterData[]) {
		let bookId = await this.createBookOfNotExists(bookData)
		await this.createBookChaptersOfNotExists(bookId, chaptersData)
	}

	async createBookOfNotExists(bookData: CreateBookPublicInput) {
		const existingBook = await this.bookPublicRepository.getBook({ name: bookData.name, author: bookData.author })
		if (existingBook) {
			return existingBook.id
		}

		const book = await this.commandBus.execute(new CreateBookPublicCommand(bookData))
		if (!book) {
			throw new CustomGraphQLError(errorMessage.book.notCreated, ErrorCode.InternalServerError_500)
		}

		return book.id
	}

	async createBookChaptersOfNotExists(bookId: number, chaptersData: ChapterData[]) {
		const bookChaptersData = getBookChapters(bookId, chaptersData)

		for (const bookChapter of bookChaptersData) {
			const existingChapter = await this.bookChapterRepository.getBookChapter({
				bookId,
				name: bookChapter.name,
			})
			if (existingChapter) return

			await this.commandBus.execute(new CreateBookChapterCommand(true, null, bookChapter))
		}
	}
}
