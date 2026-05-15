import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { BookChapterQueryRepository } from 'repo/bookChapter.queryRepository'
import { BookChapterRepository } from 'repo/bookChapter.repository'
import { BookPrivateQueryRepository } from 'repo/bookPrivate.queryRepository'
import { BookPublicRepository } from 'repo/bookPublic.repository'
import { SentenceRepository } from 'repo/sentence.repository'
import { ErrorStatusCode } from 'src/infrastructure/exceptions/errorStatusCode'
import { Language } from 'utils/languages'
import { generateSentencesAndSaveToDB } from 'features/common/generateSentencesAndSaveToDB'
import { dryText, removeBOM } from 'features/mediaCommon'
import { CustomError } from 'infrastructure/exceptions/customErrors'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { MainConfigService } from 'infrastructure/mainConfig/mainConfig.service'

export type CreateBookChapterInput = {
	bookType: 'public' | 'private'
	bookId: number
	name?: null | string
	header?: null | string
	originalContent?: null | string
	note?: null | string
}

export class CreateBookChapterCommand implements ICommand {
	constructor(
		public userId: null | number,
		public createBookChapterInput: CreateBookChapterInput,
	) {}
}

@CommandHandler(CreateBookChapterCommand)
export class CreateBookChapterHandler implements ICommandHandler<CreateBookChapterCommand> {
	constructor(
		private bookQueryRepository: BookPrivateQueryRepository,
		private bookPublicRepository: BookPublicRepository,
		private bookChapterRepository: BookChapterRepository,
		private bookChapterQueryRepository: BookChapterQueryRepository,
		private mainConfigService: MainConfigService,
		public sentenceRepository: SentenceRepository,
	) {}

	async execute(command: CreateBookChapterCommand) {
		const { userId, createBookChapterInput } = command

		const isBookPublic = createBookChapterInput.bookType === 'public'
		let bookUserId: null | number = null
		let bookLanguageCode: null | Language = null

		if (isBookPublic) {
			// Check if the book exists
			const bookForChapter = await this.bookPublicRepository.getBook({ id: createBookChapterInput.bookId })
			if (!bookForChapter) {
				throw new CustomError(errorMessage.book.notFound, ErrorStatusCode.NotFound_404)
			}
			bookLanguageCode = bookForChapter.sourceLanguageCode as Language
		} else {
			// Check if the book exists
			const bookForChapter = await this.bookQueryRepository.getBookById(createBookChapterInput.bookId)
			if (!bookForChapter) {
				throw new CustomError(errorMessage.book.notFound, ErrorStatusCode.NotFound_404)
			}

			bookUserId = bookForChapter.userId
			bookLanguageCode = (bookForChapter.languageCode ?? null) as null | Language
		}

		// Throw an error if this user is not the owner of the book
		if (!isBookPublic && userId !== bookUserId) {
			throw new CustomError(errorMessage.user.userIsNotOwner, ErrorStatusCode.Forbidden_403)
		}

		let processedContent = removeBOM(createBookChapterInput.originalContent ?? '')
		processedContent = dryText(processedContent)

		const newBookChapter = await this.bookChapterRepository.createBookChapter({
			bookType: createBookChapterInput.bookType,
			bookId: createBookChapterInput.bookId,
			name: createBookChapterInput.name,
			header: createBookChapterInput.header,
			originalContent: createBookChapterInput.originalContent,
			processedContent: processedContent ?? null,
			note: createBookChapterInput.note,
		})
		if (!newBookChapter) {
			throw new CustomError(errorMessage.bookChapter.notCreated, ErrorStatusCode.InternalServerError_500)
		}

		if (processedContent) {
			if (!bookLanguageCode) {
				throw new CustomError(errorMessage.nlp.languageRequired, ErrorStatusCode.BadRequest_400)
			}

			await generateSentencesAndSaveToDB({
				mainConfigService: this.mainConfigService,
				sentenceRepository: this.sentenceRepository,
				processedContent,
				languageCode: bookLanguageCode,
				bookChapterId: newBookChapter.id,
			})
		}

		return this.bookChapterQueryRepository.getBookChapterById(newBookChapter.id)
	}
}
