import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { BookChapterRepository } from 'repo/bookChapter.repository'
import { SentenceRepository } from 'repo/sentence.repository'
import { SentenceTranslationRepository } from 'repo/sentenceTranslation.repository'
import { CustomGraphQLError } from 'infrastructure/exceptions/customErrors'
import { ErrorCode } from 'infrastructure/exceptions/errorCode'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'

export type ImportPublicBookChapterFromSentencesInput = {
	bookId: number
	chapter: {
		name: string
		header: string
		data: {
			sentence: string
			translate: string
			analysis?: string
		}[]
	}
}

export class ImportPublicBookChapterFromSentencesCommand implements ICommand {
	constructor(public input: ImportPublicBookChapterFromSentencesInput) {}
}

@CommandHandler(ImportPublicBookChapterFromSentencesCommand)
export class ImportPublicBookChapterFromSentencesHandler
implements ICommandHandler<ImportPublicBookChapterFromSentencesCommand>
{
	constructor(
		private bookChapterRepository: BookChapterRepository,
		private sentenceRepository: SentenceRepository,
		private sentenceTranslationRepository: SentenceTranslationRepository,
	) {}

	async execute(command: ImportPublicBookChapterFromSentencesCommand) {
		const { bookId, chapter } = command.input

		let bookChapter = await this.bookChapterRepository.getBookChapter({
			bookType: 'public',
			bookId,
			name: chapter.name,
		})

		const built = buildChapterContentFromSentences(chapter.data.map((d) => d.sentence))

		if (!bookChapter) {
			bookChapter = await this.bookChapterRepository.createBookChapter({
				bookType: 'public',
				bookId,
				name: chapter.name,
				header: chapter.header,
				originalContent: built.content,
			})

			for (let i = 0; i < built.sentences.length; i++) {
				const meta = built.sentences[i]
				await this.sentenceRepository.createSentence({
					bookChapterId: bookChapter.id,
					startOffset: meta.startOffset,
					length: meta.length,
					orderIndex: meta.orderIndex,
				})
			}

			bookChapter = await this.bookChapterRepository.getBookChapter({
				bookType: 'public',
				id: bookChapter.id,
			})
		} else {
			const needsBackfill = !bookChapter.content || bookChapter.sentences.length === 0
			if (needsBackfill) {
				await this.bookChapterRepository.updateBookChapterContentById(bookChapter.id, built.content)

				for (let i = 0; i < built.sentences.length; i++) {
					const meta = built.sentences[i]
					await this.sentenceRepository.createSentence({
						bookChapterId: bookChapter.id,
						startOffset: meta.startOffset,
						length: meta.length,
						orderIndex: meta.orderIndex,
					})
				}

				bookChapter = await this.bookChapterRepository.getBookChapter({
					bookType: 'public',
					id: bookChapter.id,
				})
			}
		}

		if (!bookChapter) {
			throw new CustomGraphQLError(errorMessage.unknownDbError, ErrorCode.InternalServerError_500)
		}

		if (bookChapter.sentences.length !== chapter.data.length) {
			throw new CustomGraphQLError(errorMessage.unknownDbError, ErrorCode.InternalServerError_500)
		}

		for (let i = 0; i < bookChapter.sentences.length; i++) {
			const sentence = bookChapter.sentences[i]
			const inputRow = chapter.data[i]

			const existingTranslation =
				await this.sentenceTranslationRepository.getFirstSentenceTranslationBySentenceId(sentence.id)

			if (!existingTranslation) {
				await this.sentenceTranslationRepository.createSentenceTranslation({
					sentenceId: sentence.id,
					translation: inputRow.translate,
					analysis: inputRow.analysis,
				})
				continue
			}

			const nextAnalysis = inputRow.analysis === undefined ? existingTranslation.analysis : inputRow.analysis
			if (
				existingTranslation.translation !== inputRow.translate ||
				existingTranslation.analysis !== nextAnalysis
			) {
				await this.sentenceTranslationRepository.updateSentenceTranslationById(existingTranslation.id, {
					translation: inputRow.translate,
					analysis: inputRow.analysis === undefined ? undefined : inputRow.analysis,
				})
			}
		}

		return bookChapter
	}
}

function buildChapterContentFromSentences(sentences: string[]) {
	const separator = ' '
	let cursor = 0

	const result: { startOffset: number; length: number; orderIndex: number }[] = []
	const parts: string[] = []

	for (let i = 0; i < sentences.length; i++) {
		const text = sentences[i] ?? ''
		parts.push(text)

		result.push({
			startOffset: cursor,
			length: text.length,
			orderIndex: i,
		})

		cursor += text.length
		if (i !== sentences.length - 1) {
			parts.push(separator)
			cursor += separator.length
		}
	}

	return {
		content: parts.join(''),
		sentences: result,
	}
}
