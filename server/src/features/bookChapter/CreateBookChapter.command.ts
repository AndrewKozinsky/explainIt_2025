import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { BookRepository } from 'repo/book/book.repository'
import { BookChapterQueryRepository } from 'repo/bookChapter/bookChapter.queryRepository'
import { BookChapterRepository } from 'repo/bookChapter/bookChapter.repository'
import { SentenceRepository } from 'repo/sentence.repository'
import { Language } from 'utils/languages'
import { generateSentencesAndSaveToDB } from 'features/common/generateSentencesAndSaveToDB'
import { dryText, removeBOM } from 'features/mediaCommon'
import { CustomError } from 'infrastructure/exceptions/customErrors'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { ErrorStatusCode } from 'infrastructure/exceptions/errorStatusCode'
import { MainConfigService } from 'infrastructure/mainConfig/mainConfig.service'

export type CreateBookChapterInput = {
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
		private bookRepository: BookRepository,
		private bookChapterRepository: BookChapterRepository,
		private bookChapterQueryRepository: BookChapterQueryRepository,
		private mainConfigService: MainConfigService,
		public sentenceRepository: SentenceRepository,
	) {}

	async execute(command: CreateBookChapterCommand) {
		const { userId, createBookChapterInput } = command

		// Check if the book exists
		const bookForChapter = await this.bookRepository.getBook({ id: createBookChapterInput.bookId })
		if (!bookForChapter) {
			throw new CustomError(errorMessage.book.notFound, ErrorStatusCode.NotFound_404)
		}

		const isBookPublic = bookForChapter.type === 'public'
		let bookLanguageCode: null | Language = (bookForChapter.sourceLanguageCode as Language) ?? null

		// Throw an error if this user is not the owner of the book
		if (!isBookPublic && userId !== bookForChapter.userId) {
			throw new CustomError(errorMessage.user.isNotOwner, ErrorStatusCode.Forbidden_403)
		}

		let processedContent = removeBOM(createBookChapterInput.originalContent ?? '')
		processedContent = dryText(processedContent)

		const newBookChapter = await this.bookChapterRepository.createBookChapter({
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
