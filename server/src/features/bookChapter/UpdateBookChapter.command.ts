import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { BookChapterQueryRepository } from 'repo/bookChapter.queryRepository'
import { BookChapterRepository } from 'repo/bookChapter.repository'
import { SentenceRepository } from 'repo/sentence.repository'
import { ErrorStatusCode } from 'src/infrastructure/exceptions/errorStatusCode'
import { Language } from 'utils/languages'
import { generateSentencesAndSaveToDB } from 'features/common/generateSentencesAndSaveToDB'
import { CustomError } from 'infrastructure/exceptions/customErrors'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { MainConfigService } from 'infrastructure/mainConfig/mainConfig.service'
import { dryText, removeBOM } from '../mediaCommon'

type UpdateChapterInput = {
	id: number
	name?: null | string
	header?: null | string
	originalContent?: null | string
	note?: null | string
}

export class UpdateBookChapterCommand implements ICommand {
	constructor(
		public userId: number,
		public updateBookChapterInput: UpdateChapterInput,
	) {}
}

@CommandHandler(UpdateBookChapterCommand)
export class UpdateBookChapterHandler implements ICommandHandler<UpdateBookChapterCommand> {
	constructor(
		private bookChapterQueryRepository: BookChapterQueryRepository,
		private bookChapterRepository: BookChapterRepository,
		private mainConfigService: MainConfigService,
		public sentenceRepository: SentenceRepository,
	) {}

	async execute(command: UpdateBookChapterCommand) {
		const { userId, updateBookChapterInput } = command

		const bookChapter = await this.bookChapterRepository.getBookChapter({
			bookType: 'private',
			id: updateBookChapterInput.id,
		})
		if (!bookChapter) {
			throw new CustomError(errorMessage.bookChapter.notFound, ErrorStatusCode.NotFound_404)
		}

		if (bookChapter.book.userId !== userId) {
			throw new CustomError(errorMessage.user.userIsNotOwner, ErrorStatusCode.Forbidden_403)
		}

		let processedContent = removeBOM(updateBookChapterInput.originalContent ?? '')
		processedContent = dryText(processedContent)

		// Если текущий processedContent и новый отличаются, то удалить все текущие предложения и сгенерировать новые
		if (bookChapter.processedContent !== processedContent) {
			await this.sentenceRepository.deleteByBookChapterId(bookChapter.id)

			if (processedContent) {
				if (!bookChapter.book.languageCode) {
					throw new CustomError(errorMessage.nlp.languageRequired, ErrorStatusCode.BadRequest_400)
				}

				await generateSentencesAndSaveToDB({
					mainConfigService: this.mainConfigService,
					sentenceRepository: this.sentenceRepository,
					processedContent,
					languageCode: bookChapter.book.languageCode as Language,
					bookChapterId: bookChapter.id,
				})
			}
		}

		const updatedBookChapter = await this.bookChapterRepository.updateBookChapterById(updateBookChapterInput.id, {
			...updateBookChapterInput,
			processedContent,
		})

		if (!updatedBookChapter) {
			throw new CustomError(errorMessage.unknownDbError, ErrorStatusCode.InternalServerError_500)
		}

		return this.bookChapterQueryRepository.getBookChapterById(updatedBookChapter.id)
	}
}
