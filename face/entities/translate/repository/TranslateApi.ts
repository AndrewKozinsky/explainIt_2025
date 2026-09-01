import type {
	TranslateSentenceInput as OrvalTranslateSentenceInput,
	TranslateSentenceResultOutModel,
	GetPhraseTranslationsBySentenceInput as OrvalGetPhraseTranslationsBySentenceInput,
	GetPhraseTranslationInput as OrvalGetPhraseTranslationInput,
	TranslatePhraseInput as OrvalTranslatePhraseInput,
	SentencePhraseTranslationOutModel,
} from '@/shared/api/generated/models'
import {
	translateControllerTranslateSentence,
	translateControllerGetPhraseTranslationsBySentence,
	translateControllerGetPhraseTranslation,
	translateControllerTranslatePhrase,
} from '@/shared/api/generated/translate/translate'
import { extractString, extractNumber } from '@/shared/utils/extractors'
import { executeApiCall } from '@/shared/utils/fetchData/executeApiCall'
import type { ApiResult } from '@/shared/utils/fetchData/executeApiCall'
import type {
	TranslateRepository,
	TranslateSentenceInput,
	TranslateSentenceResultModel,
	GetPhraseTranslationsBySentenceInput,
	GetPhraseTranslationInput,
	TranslatePhraseInput,
	PhraseTranslationModel,
} from './TranslateRepository'

/**
 * Реализация TranslateRepository через REST API.
 */
export class TranslateApi implements TranslateRepository {
	async translateSentence(input: TranslateSentenceInput): Promise<ApiResult<TranslateSentenceResultModel>> {
		const orvalInput: OrvalTranslateSentenceInput = {
			sentenceId: input.sentenceId,
			targetLanguageCode: input.targetLanguageCode,
			bookName: input.bookName ?? undefined,
			bookAuthor: input.bookAuthor ?? undefined,
			videoName: input.videoName ?? undefined,
		}

		return executeApiCall(
			() => translateControllerTranslateSentence(orvalInput),
			(data) => mapToTranslateSentenceResult(data),
		)
	}

	async getPhraseTranslationsBySentence(
		input: GetPhraseTranslationsBySentenceInput,
	): Promise<ApiResult<PhraseTranslationModel[]>> {
		const orvalInput: OrvalGetPhraseTranslationsBySentenceInput = {
			sentenceId: input.sentenceId,
			targetLanguageCode: input.targetLanguageCode,
		}

		return executeApiCall(
			() => translateControllerGetPhraseTranslationsBySentence(orvalInput),
			(data) => (data ?? []).map(mapToPhraseTranslation),
		)
	}

	async getPhraseTranslation(input: GetPhraseTranslationInput): Promise<ApiResult<null | PhraseTranslationModel>> {
		const orvalInput: OrvalGetPhraseTranslationInput = {
			sentenceId: input.sentenceId,
			targetLanguageCode: input.targetLanguageCode,
			selectedWordStartOffset: input.selectedWordStartOffset,
			selectedWordEndOffset: input.selectedWordEndOffset,
		}

		return executeApiCall(
			() => translateControllerGetPhraseTranslation(orvalInput),
			(data) => (data === null ? null : mapToPhraseTranslation(data)),
		)
	}

	async translatePhrase(input: TranslatePhraseInput): Promise<ApiResult<PhraseTranslationModel>> {
		const orvalInput: OrvalTranslatePhraseInput = {
			sentenceId: input.sentenceId,
			text: input.text,
			selectedWord: input.selectedWord,
			targetLanguageCode: input.targetLanguageCode,
			selectedWordStartOffset: input.selectedWordStartOffset,
			selectedWordEndOffset: input.selectedWordEndOffset,
			bookName: input.bookName ?? undefined,
			bookAuthor: input.bookAuthor ?? undefined,
			videoName: input.videoName ?? undefined,
		}

		return executeApiCall(
			() => translateControllerTranslatePhrase(orvalInput),
			(data) => mapToPhraseTranslation(data),
		)
	}
}

/**
 * Экземпляр TranslateApi для использования в компонентах.
 */
export const translateApi = new TranslateApi()

// ─── Мапперы ─────────────────────────────────────────────────────────────────

function mapToTranslateSentenceResult(raw: TranslateSentenceResultOutModel): TranslateSentenceResultModel {
	return {
		sentenceId: extractNumber(raw.sentenceId) ?? 0,
		translation: extractString(raw.translation) ?? '',
	}
}

function mapToPhraseTranslation(raw: SentencePhraseTranslationOutModel): PhraseTranslationModel {
	const r = raw as Record<string, unknown>

	return {
		id: extractNumber(r.id) ?? 0,
		phraseStartOffset: extractNumber(r.phraseStartOffset) ?? 0,
		phraseEndOffset: extractNumber(r.phraseEndOffset) ?? 0,
		phrase: extractString(r.phrase),
		translation: extractString(r.translate),
		examples: mapToExamples(r.examples),
	}
}

function mapToExamples(raw: unknown): PhraseTranslationModel['examples'] {
	if (!Array.isArray(raw)) return []
	return raw.map((item: Record<string, unknown>) => ({
		text: extractString(item.text) ?? '',
		translate: extractString(item.translate) ?? '',
	}))
}
