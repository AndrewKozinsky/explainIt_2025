import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { FlashcardQueryRepository } from 'repo/flashcard.queryRepository'
import { FlashcardRepository } from 'repo/flashcard.repository'
import { SentenceRepository } from 'repo/sentence.repository'
import { SentencePhraseTranslationRepository } from 'repo/sentencePhraseTranslation.repository'
import { SentenceTranslationRepository } from 'repo/sentenceTranslation.repository'
import { ErrorStatusCode } from 'src/infrastructure/exceptions/errorStatusCode'
import { CustomError } from 'infrastructure/exceptions/customErrors'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { FlashcardOutModel } from 'models/flashcard/flashcard.out.model'
import { LanguageCode } from 'prisma/generated/client'

export class AddFlashcardCommand implements ICommand {
	constructor(
		public dto: {
			userId: number
			sentencePhraseTranslationId: number
		},
	) {}
}

type DbSentenceWithRelations = NonNullable<Awaited<ReturnType<SentenceRepository['getSentenceDbById']>>>

// Разрешённый источник предложения (книга или видео): какая FK будет у карточки,
// язык фразы и полный текст источника, из которого будет нарезан снапшот предложения.
type ResolvedSentenceSource = {
	languageCode: LanguageCode
	sourceFullText: string
	bookPrivateId: null | number
	bookPublicId: null | number
	videoPrivateId: null | number
	videoPublicId: null | number
}

@CommandHandler(AddFlashcardCommand)
export class AddFlashcardHandler implements ICommandHandler<AddFlashcardCommand, FlashcardOutModel> {
	constructor(
		private sentenceRepository: SentenceRepository,
		private sentencePhraseTranslationRepository: SentencePhraseTranslationRepository,
		private sentenceTranslationRepository: SentenceTranslationRepository,
		private flashcardRepository: FlashcardRepository,
		private flashcardQueryRepository: FlashcardQueryRepository,
	) {}

	async execute(command: AddFlashcardCommand): Promise<FlashcardOutModel> {
		const { userId, sentencePhraseTranslationId } = command.dto

		const phrase = await this.sentencePhraseTranslationRepository.getPhraseById(sentencePhraseTranslationId)
		if (!phrase) {
			throw new CustomError(errorMessage.flashcard.sourcePhraseNotFound, ErrorStatusCode.NotFound_404)
		}

		const existingFlashcard = await this.flashcardRepository.getFlashcardByUserAndPhraseId(
			userId,
			sentencePhraseTranslationId,
		)
		if (existingFlashcard) {
			throw new CustomError(errorMessage.flashcard.alreadyExists, ErrorStatusCode.BadRequest_400)
		}

		const sentence = await this.sentenceRepository.getSentenceDbById(phrase.sentenceId)
		if (!sentence) {
			throw new CustomError(errorMessage.flashcard.sourceSentenceNotFound, ErrorStatusCode.NotFound_404)
		}

		const sentenceSource = this.resolveSentenceSource(sentence, userId)

		const sentenceText = sentenceSource.sourceFullText.slice(
			sentence.start_offset,
			sentence.start_offset + sentence.length,
		)
		// phrase.phraseStartOffset / phraseEndOffset уже хранятся относительно текста предложения
		// (см. SentencePhraseTranslation.phrase_start_offset — "Phrase start offset within the sentence text snapshot"),
		// поэтому никакой дополнительной корректировки на sentence.start_offset делать не нужно.
		const phraseStartOffset = phrase.phraseStartOffset
		const phraseEndOffset = phrase.phraseEndOffset

		const sentenceTranslation =
			await this.sentenceTranslationRepository.getSentenceTranslationBySentenceIdAndTargetLanguageCode({
				sentenceId: sentence.id,
				targetLanguageCode: phrase.targetLanguageCode,
			})

		const created = await this.flashcardRepository.createFlashcard({
			userId,
			languageCode: sentenceSource.languageCode,
			sentenceText,
			sentenceTranslation: sentenceTranslation?.translation ?? null,
			phrase: phrase.phrase,
			phraseStartOffset,
			phraseEndOffset,
			phraseTranslation: phrase.translate,
			examples: phrase.examples,
			bookPrivateId: sentenceSource.bookPrivateId,
			bookPublicId: sentenceSource.bookPublicId,
			videoPrivateId: sentenceSource.videoPrivateId,
			videoPublicId: sentenceSource.videoPublicId,
			sentencePhraseTranslationId,
		})

		const out = await this.flashcardQueryRepository.getFlashcardById(created.id)
		if (!out) {
			throw new CustomError(errorMessage.flashcard.notFound, ErrorStatusCode.InternalServerError_500)
		}
		return out
	}

	// Определяет источник предложения (книга/видео, приватная/публичная), проверяет,
	// имеет ли пользователь доступ к приватному материалу, и возвращает всё, что нужно
	// для снапшота карточки.
	private resolveSentenceSource(sentence: DbSentenceWithRelations, userId: number): ResolvedSentenceSource {
		const emptySource: Omit<ResolvedSentenceSource, 'languageCode' | 'sourceFullText'> = {
			bookPrivateId: null,
			bookPublicId: null,
			videoPrivateId: null,
			videoPublicId: null,
		}

		if (sentence.bookChapter) {
			const sourceFullText = this.pickFullText(
				sentence.bookChapter.processed_content,
				sentence.bookChapter.original_content,
			)

			if (sentence.bookChapter.book) {
				this.assertOwner(sentence.bookChapter.book.user_id, userId)
				return {
					...emptySource,
					bookPrivateId: sentence.bookChapter.book.id,
					languageCode: sentence.bookChapter.book.source_language_code,
					sourceFullText,
				}
			}

			if (sentence.bookChapter.book_public) {
				return {
					...emptySource,
					bookPublicId: sentence.bookChapter.book_public.id,
					languageCode: sentence.bookChapter.book_public.source_language_code,
					sourceFullText,
				}
			}
		}

		if (sentence.videoPrivate) {
			this.assertOwner(sentence.videoPrivate.user_id, userId)
			return {
				...emptySource,
				videoPrivateId: sentence.videoPrivate.id,
				languageCode: sentence.videoPrivate.source_language_code,
				sourceFullText: this.pickFullText(
					sentence.videoPrivate.processed_content,
					sentence.videoPrivate.original_content,
				),
			}
		}

		if (sentence.videoPublic) {
			return {
				...emptySource,
				videoPublicId: sentence.videoPublic.id,
				languageCode: sentence.videoPublic.source_language_code,
				sourceFullText: this.pickFullText(
					sentence.videoPublic.processed_content,
					sentence.videoPublic.original_content,
				),
			}
		}

		throw new CustomError(errorMessage.flashcard.sourceLanguageNotFound, ErrorStatusCode.BadRequest_400)
	}

	private assertOwner(sourceOwnerId: number, userId: number) {
		if (sourceOwnerId !== userId) {
			throw new CustomError(errorMessage.user.isNotOwner, ErrorStatusCode.Forbidden_403)
		}
	}

	// В исходнике главы/видео может быть заполнен только один из текстов. Предпочитаем
	// processed_content (из него нарезаются оффсеты предложения).
	private pickFullText(processed: null | string, original: null | string): string {
		return processed ?? original ?? ''
	}
}
