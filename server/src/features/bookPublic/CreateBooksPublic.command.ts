import { CommandBus, CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { BookChapterRepository } from 'repo/bookChapter.repository'
import { BookPublicRepository } from 'repo/bookPublic.repository'
import { CreateBookChapterCommand } from 'features/bookChapter/CreateBookChapter.command'
import { CustomGraphQLError } from 'infrastructure/exceptions/customErrors'
import { ErrorCode } from 'infrastructure/exceptions/errorCode'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { ChapterData, getBookChapters } from './common/common'
import { CreateBookPublicCommand, CreateBookPublicInput } from './CreateBookPublic.command'
import { solomonMinesBookData, solomonMinesChapters } from './solomonMines/solomonMinesBook'
import { wizardOfOzBookData, wizardOfOzChapters } from './wizardOfOz/wizardOfOzBook'

export class CreateBooksPublicCommand implements ICommand {
	constructor() {}
}

@CommandHandler(CreateBooksPublicCommand)
export class CreatePublicBooksHandler implements ICommandHandler<CreateBooksPublicCommand> {
	constructor(
		private commandBus: CommandBus,
		public bookPublicRepository: BookPublicRepository,
		public bookChapterRepository: BookChapterRepository,
	) {}

	async execute() {
		for (let i = 0; i < this.getBooksData().length; i++) {
			const { book, chapters } = this.getBooksData()[i]
			await this.createBookAndChaptersOfNotExists(book, chapters)
		}
	}

	getBooksData() {
		return [
			{
				book: wizardOfOzBookData,
				chapters: wizardOfOzChapters,
			},
			{
				book: solomonMinesBookData,
				chapters: solomonMinesChapters,
			},
		]
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
				bookType: 'public',
				bookId,
				name: bookChapter.name,
			})

			if (!existingChapter) {
				await this.commandBus.execute(new CreateBookChapterCommand(null, bookChapter))
			}
		}
	}
}
