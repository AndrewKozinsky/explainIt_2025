import type { TranscriptionOutModel, UniversalPhraseTranslationOutModel } from '@/shared/api/generated/models'
import { universalPhraseTranslationControllerGetOrCreateTranslation } from '@/shared/api/generated/universal-phrase-translation/universal-phrase-translation'
import type { ApiResult } from '@/shared/utils/fetchData/executeApiCall'
import { executeApiCall } from '@/shared/utils/fetchData/executeApiCall'
import type {
	GetOrCreateTranslationInput,
	PhraseTranslationDataModel,
	PhraseTranslationModel,
	PhraseTranslationRepository,
	TranslationBlockModel,
	TranslationStatus,
} from './PhraseTranslationRepository'
import type { TranscriptionModel } from '../../phrase/repository/PhraseRepository'

/**
 * Реализация PhraseTranslationRepository через REST API.
 */
export class PhraseTranslationApi implements PhraseTranslationRepository {
	async getOrCreateTranslation(
		input: GetOrCreateTranslationInput,
		signal?: AbortSignal,
	): Promise<ApiResult<PhraseTranslationModel>> {
		return executeApiCall(
			() => universalPhraseTranslationControllerGetOrCreateTranslation(input, { signal }),
			(data) => mapToPhraseTranslation(data),
		)
	}
}

// ─── Mappers ────────────────────────────────────────────────────────────────

function mapToPhraseTranslation(raw: UniversalPhraseTranslationOutModel): PhraseTranslationModel {
	return {
		id: raw.id,
		universalPhraseId: raw.universalPhraseId ?? null,
		targetLanguageCode: raw.targetLanguageCode,
		translation: mapToArticle(raw),
		status: mapStatus(raw.status),
		errorCode: raw.errorCode ?? null,
		nonExistentWord: raw.nonExistentWord,
		createdAt: raw.createdAt,
		transcription: raw.transcription ? mapToTranscription(raw.transcription) : null,
	}
}

function mapToArticle(raw: UniversalPhraseTranslationOutModel): PhraseTranslationDataModel | null {
	if (!raw.translation) return null

	return {
		blocks: raw.translation as unknown as TranslationBlockModel[],
		deepSections: (raw.deepSections ?? []) as unknown as TranslationBlockModel[],
		wordForms: raw.wordForms,
	}
}

function mapToTranscription(raw: TranscriptionOutModel): TranscriptionModel {
	return {
		id: raw.id,
		universalPhraseId: raw.universalPhraseId,
		ipa: raw.ipa ?? null,
		pinyin: raw.pinyin ?? null,
	}
}

function mapStatus(raw: string): TranslationStatus {
	if (raw === 'pending' || raw === 'ready' || raw === 'error') {
		return raw
	}
	return 'error'
}
