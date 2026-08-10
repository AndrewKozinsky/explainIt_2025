import {
	flashcardControllerAddFlashcard,
	flashcardControllerGetMyFlashcards,
	flashcardControllerRemoveFlashcard,
} from '@/shared/api/generated/flashcard/flashcard'
import type { FlashcardOutModel, SentencePhraseTranslationExampleOutModel } from '@/shared/api/generated/models'
import { executeApiCall } from '@/shared/utils/fetchData/executeApiCall'
import type { ApiResult } from '@/shared/utils/fetchData/executeApiCall'
import type {
	AddFlashcardInput,
	FlashcardExampleModel,
	FlashcardModel,
	FlashcardRepository,
	GetMyFlashcardsParams,
	RemoveFlashcardInput,
} from './FlashcardRepository'

/**
 * Реализация FlashcardRepository через REST API.
 */
export class FlashcardApi implements FlashcardRepository {
	async getMyFlashcards(params?: GetMyFlashcardsParams): Promise<ApiResult<FlashcardModel[]>> {
		return executeApiCall(
			() =>
				flashcardControllerGetMyFlashcards(
					params ? { languageCode: params.languageCode ?? undefined } : undefined,
				),
			(data) => data.map(mapToFlashcard),
		)
	}

	async addFlashcard(input: AddFlashcardInput): Promise<ApiResult<FlashcardModel>> {
		return executeApiCall(
			() => flashcardControllerAddFlashcard({ sentencePhraseTranslationId: input.sentencePhraseTranslationId }),
			(data) => mapToFlashcard(data),
		)
	}

	async removeFlashcard(input: RemoveFlashcardInput): Promise<ApiResult<void>> {
		return executeApiCall(() => flashcardControllerRemoveFlashcard({ flashcardId: input.flashcardId }))
	}
}

// ─── Mappers ────────────────────────────────────────────────────────────────

function mapToFlashcard(raw: FlashcardOutModel): FlashcardModel {
	return {
		id: raw.id,
		languageCode: raw.languageCode ?? null,
		sentenceText: raw.sentenceText,
		phrase: raw.phrase,
		phraseStartOffset: raw.phraseStartOffset,
		phraseEndOffset: raw.phraseEndOffset,
		sentenceTranslation: raw.sentenceTranslation ?? null,
		phraseTranslation: raw.phraseTranslation ?? null,
		phraseTranscription: raw.phraseTranscription ?? null,
		examples: (raw.examples ?? []).map(mapToExample),
		bookId: raw.bookId ?? null,
		videoId: raw.videoId ?? null,
		sentencePhraseTranslationId: raw.sentencePhraseTranslationId ?? null,
		createdAt: raw.createdAt,
	}
}

function mapToExample(raw: SentencePhraseTranslationExampleOutModel): FlashcardExampleModel {
	return {
		text: String(raw.text ?? ''),
		translate: String(raw.translate ?? ''),
	}
}
