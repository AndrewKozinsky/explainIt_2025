import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { BookChapterQueryRepository } from 'repo/bookChapter.queryRepository'
import { BookChapterRepository } from 'repo/bookChapter.repository'
import { SentenceRepository } from 'repo/sentence.repository'
import { CustomGraphQLError } from 'infrastructure/exceptions/customErrors'
import { ErrorCode } from 'infrastructure/exceptions/errorCode'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { MainConfigService } from 'infrastructure/mainConfig/mainConfig.service'

type UpdateBookChapterInput = {
	id: number
	name?: null | string
	header?: null | string
	content?: null | string
	note?: null | string
}

export class UpdateBookChapterCommand implements ICommand {
	constructor(
		public userId: number,
		public updateBookChapterInput: UpdateBookChapterInput,
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

		// Prepare content: make text flat (remove newlines) before saving and sentence generation
		const processedContent = updateBookChapterInput.content
			? this.dryText(updateBookChapterInput.content)
			: updateBookChapterInput.content

		const updatePayload: UpdateBookChapterInput = {
			...updateBookChapterInput,
			content: processedContent,
		}

		const updatedBookChapter = await this.bookChapterRepository.updateBookChapterById(
			updateBookChapterInput.id,
			updatePayload,
		)
		if (!updatedBookChapter) {
			throw new CustomGraphQLError(errorMessage.unknownDbError, ErrorCode.InternalServerError_500)
		}

		// Generate sentences
		// await this.generateSentences(updatedBookChapter.id, processedContent)

		return this.bookChapterQueryRepository.getBookChapterById(updatedBookChapter.id)
	}

	// Make text flat: remove line breaks and collapse excessive whitespace
	dryText(text: string) {
		return text
		// Replace CRLF/CR/LF with spaces, collapse multiple spaces/tabs, and trim
		return text
			.replace(/[\r\n]+/g, ' ')
			.replace(/\s+/g, ' ')
			.trim()
	}

	async generateSentences(bookChapterId: number, content: undefined | null | string) {
		console.log(333)
		if (!content) return

		try {
			// Clear previously saved sentences for this chapter to avoid duplicates
			await this.sentenceRepository.deleteByBookChapterId(bookChapterId)

			// Ask NLP service to split text into sentences
			const divideIntoSentencesRes = await fetch(this.mainConfigService.get().nlp.containerUrl + '/sentences', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ text: content }),
			})
			const resJson: { sentences: string[] } = await divideIntoSentencesRes.json()
			const sentences = resJson.sentences || []

			// Walk through the content and locate each sentence from the current cursor forward
			let cursor = 0
			for (let i = 0; i < sentences.length; i++) {
				const sentence = sentences[i]

				const startOffset = content.indexOf(sentence, cursor)
				if (startOffset === -1) {
					// If we cannot find the sentence as returned by NLP in the original content moving forward,
					// treat it as an NLP mismatch and fail, so the error handler will report it properly.
					throw new Error('Sentence offset not found')
				}

				const length = sentence.length

				await this.sentenceRepository.createSentence({
					startOffset,
					length,
					bookChapterId,
					orderIndex: i, // zero-based
				})
				cursor = startOffset + length
			}
		} catch (error) {
			throw new CustomGraphQLError(
				errorMessage.nlp.cantDivideTextIntoSentences,
				ErrorCode.InternalServerError_500,
			)
		}
	}
}
