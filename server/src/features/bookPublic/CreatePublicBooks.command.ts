import { CommandBus, CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { BookChapterRepository } from 'repo/bookChapter.repository'
import { BookPublicRepository } from 'repo/bookPublic.repository'
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
import { secretCluesBookData, secretCluesChapters } from './english/secretClues/secretCluesBook'
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
		public bookPublicRepository: BookPublicRepository,
		private bookChapterRepository: BookChapterRepository,
		private mainConfig: MainConfigService,
	) {}

	async execute() {
		const booksData = this.getBooksData()
		const createdBooks = []

		for (const data of booksData) {
			const bookId = await this.getOrCreateBookOfNotExists(data.book)
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

		const coversFolderName = this.mainConfig.get().yandexCloud.s3.bucketUrl + '/' + folderName + '/'

		return [
			// English
			/*{
				book: wizardOfOzBookData(coversFolderName + 'english/'),
				chapters: wizardOfOzChapters,
			},
			{
				book: solomonMinesBookData(coversFolderName + 'english/'),
				chapters: solomonMinesChapters,
			},
			{
				book: oliverTwistBookData(coversFolderName + 'english/'),
				chapters: oliverTwistChapters,
			},
			{
				book: aStudyInScarletPartOneBookData(coversFolderName + 'english/'),
				chapters: aStudyInScarletPartOneChapters,
			},
			{
				book: aStudyInScarletPartTwoBookData(coversFolderName + 'english/'),
				chapters: aStudyInScarletPartTwoChapters,
			},*/
			{
				book: secretCluesBookData(coversFolderName + 'english/'),
				chapters: secretCluesChapters,
			},
			// German
			/*{
				book: littleRedRidingHoodBookData(coversFolderName + 'german/'),
				chapters: littleRedRidingHoodChapters,
			},
			{
				book: theTransformationBookData(coversFolderName + 'german/'),
				chapters: theTransformationChapters,
			},
			{
				book: processBookData(coversFolderName + 'german/'),
				chapters: processChapters,
			},*/
			// Spanish
			/*{
				book: jungleTalesBookData(coversFolderName + 'spanish/'),
				chapters: jungleTalesChapters,
			},
			{
				book: donQuixoteBookData(coversFolderName + 'spanish/'),
				chapters: donQuixoteChapters,
			},*/
			// French
			/*{
				book: theLittlePrinceBookData(coversFolderName + 'french/'),
				chapters: theLittlePrinceChapters,
			},
			{
				book: theCountOfMonteCristoBookData(coversFolderName + 'french/'),
				chapters: theCountOfMonteCristoChapters,
			},*/
			// Italian
			/*{
				book: heartBookData(coversFolderName + 'italian/'),
				chapters: heartChapters,
			},
			{
				book: pinocchioBookData(coversFolderName + 'italian/'),
				chapters: pinocchioChapters,
			},*/
			// Turkish
			/*{
				book: nasreddinHodjaStoriesBookData(coversFolderName + 'turkish/'),
				chapters: nasreddinHodjaStoriesChapters,
			},*/
		]
	}

	async getOrCreateBookOfNotExists(bookData: CreateBookPublicInput) {
		const existingBook = await this.bookPublicRepository.getBook({ name: bookData.name, author: bookData.author })
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
				bookType: 'public',
				bookId,
				name: bookChapter.name,
				header: bookChapter.header,
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
