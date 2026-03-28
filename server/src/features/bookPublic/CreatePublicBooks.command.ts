import { CommandBus, CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { BookChapterRepository } from 'repo/bookChapter.repository'
import { BookPublicRepository } from 'repo/bookPublic.repository'
import {
	littleRedRidingHoodChapters,
	littleRedRidingHoodBookData,
} from 'src/features/bookPublic/german/littleRedRidingHood/littleRedRidingHood'
import { CreateBookChapterCommand } from 'features/bookChapter/CreateBookChapter.command'
import { CustomGraphQLError } from 'infrastructure/exceptions/customErrors'
import { ErrorCode } from 'infrastructure/exceptions/errorCode'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { MainConfigService } from 'infrastructure/mainConfig/mainConfig.service'
import { ChapterData } from './common/common'
import { CreatePublicBookCommand, CreateBookPublicInput } from './CreatePublicBook.command'
import { solomonMinesBookData, solomonMinesChapters } from './english/solomonMines/solomonMinesBook'
import { wizardOfOzBookData, wizardOfOzChapters } from './english/wizardOfOz/wizardOfOzBook'

export class CreatePublicBooksCommand implements ICommand {
	constructor() {}
}

@CommandHandler(CreatePublicBooksCommand)
export class CreatePublicBooksHandler implements ICommandHandler<CreatePublicBooksCommand> {
	constructor(
		private commandBus: CommandBus,
		public bookPublicRepository: BookPublicRepository,
		private bookChapterRepository: BookChapterRepository,
		private mainConfig: MainConfigService,
	) {}

	async execute() {
		for (let i = 0; i < this.getBooksData().length; i++) {
			const { book, chapters } = this.getBooksData()[i]
			await this.createBookAndChaptersOfNotExists(book, chapters)
		}
	}

	getBooksData() {
		const workingMode = this.mainConfig.get().mode!
		const folderName = ['localdev', 'localtest', 'localcheckserver'].includes(workingMode)
			? 'publicBooksDev'
			: 'publicBooks'

		const coversFolderName = this.mainConfig.get().yandexCloud.s3.bucketUrl + '/' + folderName + '/'

		return [
			// English
			{
				book: wizardOfOzBookData(coversFolderName + 'english/'),
				chapters: wizardOfOzChapters,
			},
			/*{
				book: solomonMinesBookData(coversFolderName + 'english/'),
				chapters: solomonMinesChapters,
			},*/
			// German
			/*{
				book: littleRedRidingHoodBookData(coversFolderName + 'german/'),
				chapters: littleRedRidingHoodChapters,
			},*/
		]
	}

	async createBookAndChaptersOfNotExists(bookData: CreateBookPublicInput, chaptersData: ChapterData[]) {
		let bookId = await this.createBookOfNotExists(bookData)
		await this.createBookChaptersOfNotExists(bookId, chaptersData)
	}

	async createBookOfNotExists(bookData: CreateBookPublicInput) {
		const existingBook = await this.bookPublicRepository.getBook({ name: bookData.name, author: bookData.author })
		if (existingBook) return existingBook.id

		const book = await this.commandBus.execute(new CreatePublicBookCommand(bookData))
		if (!book) {
			throw new CustomGraphQLError(errorMessage.book.notCreated, ErrorCode.InternalServerError_500)
		}

		return book.id
	}

	async createBookChaptersOfNotExists(bookId: number, chaptersData: ChapterData[]) {
		for (const bookChapter of chaptersData) {
			const existingBookChapter = await this.bookChapterRepository.getBookChapter({
				bookType: 'public',
				bookId,
				name: bookChapter.name,
			})
			if (existingBookChapter) {
				continue
			}

			await this.commandBus.execute(
				new CreateBookChapterCommand(null, {
					bookType: 'public',
					bookId,
					name: bookChapter.name,
					header: bookChapter.header,
					originalContent: bookChapter.text,
					note: null,
				}),
			)
		}
	}
}
