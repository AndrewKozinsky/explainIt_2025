import { CommandBus, CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { BookRepository } from 'repo/book/book.repository'
import { BookChapterRepository } from 'repo/bookChapter/bookChapter.repository'
import { CreateBookChapterCommand } from 'features/bookChapter/CreateBookChapter.command'
import { oliverTwistBookData, oliverTwistChapters } from 'features/bookPublic/english/oliverTwist/Oliver Twist'
import {
	theCountOfMonteCristoBookData,
	theCountOfMonteCristoChapters,
} from 'features/bookPublic/french/theCountOfMonteCristo/theCountOfMonteCristoBook'
import {
	theLittlePrinceBookData,
	theLittlePrinceChapters,
} from 'features/bookPublic/french/theLittlePrince/theLittlePrinceBook'
import { processBookData, processChapters } from 'features/bookPublic/german/process/process'
import {
	theTransformationBookData,
	theTransformationChapters,
} from 'features/bookPublic/german/theTransformation/theTransformation'
import { heartBookData, heartChapters } from 'features/bookPublic/italian/heart/heart'
import { pinocchioBookData, pinocchioChapters } from 'features/bookPublic/italian/pinocchio/pinocchio'
import { donQuixoteBookData, donQuixoteChapters } from 'features/bookPublic/spanish/donQuixote/donQuixote'
import { jungleTalesBookData, jungleTalesChapters } from 'features/bookPublic/spanish/jungleTales/jungleTales'
import { CustomError } from 'infrastructure/exceptions/customErrors'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { ErrorStatusCode } from 'infrastructure/exceptions/errorStatusCode'
import { MainConfigService } from 'infrastructure/mainConfig/mainConfig.service'
import { ChapterData } from './common/common'
import { CreatePublicBookCommand, CreateBookPublicInput } from './CreatePublicBook.command'
import {
	aStudyInScarletPartOneBookData,
	aStudyInScarletPartOneChapters,
} from './english/aStudyInScarletPartOne/aStudyInScarletPartOneBook'
import {
	aStudyInScarletPartTwoBookData,
	aStudyInScarletPartTwoChapters,
} from './english/aStudyInScarletPartTwo/aStudyInScarletPartTwoBook'
// import { secretCluesBookData, secretCluesChapters } from './english/secretClues/secretCluesBook'
import { solomonMinesBookData, solomonMinesChapters } from './english/solomonMines/solomonMinesBook'
import { wizardOfOzBookData, wizardOfOzChapters } from './english/wizardOfOz/wizardOfOzBook'
import {
	littleRedRidingHoodChapters,
	littleRedRidingHoodBookData,
} from './german/littleRedRidingHood/littleRedRidingHood'
import {
	nasreddinHodjaStoriesBookData,
	nasreddinHodjaStoriesChapters,
} from './turkish/nasreddinHodjaStories/nasreddinHodjaStories'

export class CreatePublicBooksCommand implements ICommand {
	constructor() {}
}

@CommandHandler(CreatePublicBooksCommand)
export class CreatePublicBooksHandler implements ICommandHandler<CreatePublicBooksCommand> {
	constructor(
		private commandBus: CommandBus,
		public bookRepository: BookRepository,
		private bookChapterRepository: BookChapterRepository,
		private mainConfig: MainConfigService,
	) {}

	async execute() {
		const booksData = this.getBooksData()
		const createdBooks = []

		for (const data of booksData) {
			const bookId = await this.getOrCreateBook(data.book)
			createdBooks.push({
				bookId,
				chapters: data.chapters,
			})
		}

		for (const createdBook of createdBooks) {
			await this.createBookChaptersOfNotExists(createdBook.bookId, createdBook.chapters)
		}
	}

	getBooksData() {
		const workingMode = this.mainConfig.get().mode!
		const folderName = ['localdev', 'localtest', 'localcheckserver'].includes(workingMode)
			? 'publicBooksDev'
			: 'publicBooks'

		const s3FolderName = folderName + '/'

		return [
			// English
			{
				book: wizardOfOzBookData(s3FolderName + 'english/'),
				chapters: wizardOfOzChapters,
			},
			/*{
				book: solomonMinesBookData(s3FolderName + 'english/'),
				chapters: solomonMinesChapters,
			},*/
			/*{
				book: oliverTwistBookData(s3FolderName + 'english/'),
				chapters: oliverTwistChapters,
			},*/
			/*{
				book: aStudyInScarletPartOneBookData(s3FolderName + 'english/'),
				chapters: aStudyInScarletPartOneChapters,
			},*/
			/*{
				book: aStudyInScarletPartTwoBookData(s3FolderName + 'english/'),
				chapters: aStudyInScarletPartTwoChapters,
			},*/
			/*{
				book: secretCluesBookData(s3FolderName + 'english/'),
				chapters: secretCluesChapters,
			},*/
			// German
			{
				book: littleRedRidingHoodBookData(s3FolderName + 'german/'),
				chapters: littleRedRidingHoodChapters,
			},
			/*{
				book: theTransformationBookData(s3FolderName + 'german/'),
				chapters: theTransformationChapters,
			},*/
			/*{
				book: processBookData(s3FolderName + 'german/'),
				chapters: processChapters,
			},*/
			// Spanish
			{
				book: jungleTalesBookData(s3FolderName + 'spanish/'),
				chapters: jungleTalesChapters,
			},
			/*{
				book: donQuixoteBookData(s3FolderName + 'spanish/'),
				chapters: donQuixoteChapters,
			},*/
			// French
			{
				book: theLittlePrinceBookData(s3FolderName + 'french/'),
				chapters: theLittlePrinceChapters,
			},
			/*{
				book: theCountOfMonteCristoBookData(s3FolderName + 'french/'),
				chapters: theCountOfMonteCristoChapters,
			},*/
			// Italian
			{
				book: heartBookData(s3FolderName + 'italian/'),
				chapters: heartChapters,
			},
			/*{
				book: pinocchioBookData(s3FolderName + 'italian/'),
				chapters: pinocchioChapters,
			},*/
			// Turkish
			{
				book: nasreddinHodjaStoriesBookData(s3FolderName + 'turkish/'),
				chapters: nasreddinHodjaStoriesChapters,
			},
		]
	}

	async getOrCreateBook(bookData: CreateBookPublicInput) {
		const existingBook = await this.bookRepository.getBook({ name: bookData.name, author: bookData.author })
		if (existingBook) return existingBook.id

		const book = await this.commandBus.execute(new CreatePublicBookCommand(bookData))
		if (!book) {
			throw new CustomError(errorMessage.book.notCreated, ErrorStatusCode.InternalServerError_500)
		}

		return book.id
	}

	async createBookChaptersOfNotExists(bookId: number, chaptersData: ChapterData[]) {
		for (const bookChapter of chaptersData) {
			const existingBookChapter = await this.bookChapterRepository.getBookChapter({
				bookId,
				name: bookChapter.name,
				header: bookChapter.header,
			})
			if (existingBookChapter) {
				continue
			}

			await this.commandBus.execute(
				new CreateBookChapterCommand(null, {
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
