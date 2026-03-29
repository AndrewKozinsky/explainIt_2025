import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { BookChapterQueryRepository } from 'repo/bookChapter.queryRepository'
import { BookChapterRepository } from 'repo/bookChapter.repository'
import { SentenceRepository } from 'repo/sentence.repository'
import { generateSentencesAndSaveToDB } from 'features/common/generateSentencesAndSaveToDB'
import { CustomGraphQLError } from 'infrastructure/exceptions/customErrors'
import { ErrorCode } from 'infrastructure/exceptions/errorCode'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { MainConfigService } from 'infrastructure/mainConfig/mainConfig.service'
import { BookChapterServiceModel } from 'models/bookChapter/bookChapter.service.model'
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
			throw new CustomGraphQLError(errorMessage.bookChapter.notFound, ErrorCode.NotFound_404)
		}

		if (bookChapter.book.userId !== userId) {
			throw new CustomGraphQLError(errorMessage.userIsNotOwner, ErrorCode.Forbidden_403)
		}

		let processedContent = removeBOM(updateBookChapterInput.originalContent ?? '')
		processedContent = dryText(processedContent)

		// Если текущий processedContent и новый отличаются, то удалить все текущие предложения и сгенерировать новые
		if (bookChapter.processedContent !== processedContent) {
			await this.sentenceRepository.deleteByBookChapterId(bookChapter.id)

			if (processedContent) {
				await generateSentencesAndSaveToDB({
					mainConfigService: this.mainConfigService,
					sentenceRepository: this.sentenceRepository,
					processedContent,
					bookChapterId: bookChapter.id,
				})
			}
		}

		const updatedBookChapter = await this.bookChapterRepository.updateBookChapterById(updateBookChapterInput.id, {
			...updateBookChapterInput,
			processedContent,
		})

		if (!updatedBookChapter) {
			throw new CustomGraphQLError(errorMessage.unknownDbError, ErrorCode.InternalServerError_500)
		}

		return this.bookChapterQueryRepository.getBookChapterById(updatedBookChapter.id)
	}
}
