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

type UpdateChapterInput = {
	id: number
	name?: null | string
	header?: null | string
	content?: null | string
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

		// Prepare update payload: include only explicitly provided fields; flatten content text
		const preparedUpdateChapterInput = this.prepareUpdateChapterInput(bookChapter, updateBookChapterInput)

		if (preparedUpdateChapterInput.content === null || preparedUpdateChapterInput.content === '') {
			await this.sentenceRepository.deleteByBookChapterId(bookChapter.id)
		}

		if (preparedUpdateChapterInput.content) {
			await generateSentencesAndSaveToDB({
				mainConfigService: this.mainConfigService,
				sentenceRepository: this.sentenceRepository,
				content: preparedUpdateChapterInput.content,
				bookChapterId: preparedUpdateChapterInput.id,
			})
		}

		const updatedBookChapter = await this.bookChapterRepository.updateBookChapterById(
			updateBookChapterInput.id,
			preparedUpdateChapterInput,
		)
		if (!updatedBookChapter) {
			throw new CustomGraphQLError(errorMessage.unknownDbError, ErrorCode.InternalServerError_500)
		}

		return this.bookChapterQueryRepository.getBookChapterById(updatedBookChapter.id)
	}

	// Make text flat: remove line breaks and collapse excessive whitespace
	dryText(text: string) {
		// Replace CRLF/CR/LF with spaces, collapse multiple spaces/tabs, and trim
		return text
			.replace(/[\r\n]+/g, ' ')
			.replace(/\s+/g, ' ')
			.trim()
	}

	/**
	 * Build minimal payload for DB update from the provided input.
	 * - Includes ONLY fields explicitly provided in `updateBookChapterInput` (omits undefined).
	 * - Preserves `null` values as-is so fields can be cleared.
	 * - Normalizes `content` via `dryText` when it is a string (may become an empty string).
	 */
	private prepareUpdateChapterInput(
		bookChapter: BookChapterServiceModel,
		updateBookChapterInput: UpdateChapterInput,
	): UpdateChapterInput {
		const updateBookChapterInputCopy = { ...updateBookChapterInput }

		if (updateBookChapterInputCopy.content) {
			if (this.dryText(updateBookChapterInputCopy.content) === bookChapter.content) {
				delete updateBookChapterInputCopy.content
			} else {
				updateBookChapterInputCopy.content = this.dryText(updateBookChapterInputCopy.content)
			}
		}

		return updateBookChapterInputCopy
	}

}
