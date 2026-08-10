// import type { UniversalPhraseTranslationOutModel, TranscriptionOutModel } from '@/shared/api/generated/models'
// import { universalPhraseTranslationControllerGetOrCreateTranslation } from '@/shared/api/generated/universal-phrase-translation/universal-phrase-translation'
// import { executeApiCall } from '@/shared/utils/fetchData/executeApiCall'
// import type { ApiResult } from '@/shared/utils/fetchData/executeApiCall'
// import type {
// 	GetOrCreateTranslationInput,
// 	PhraseTranslationDataModel,
// 	PhraseTranslationModel,
// 	PhraseTranslationRepository,
// 	TranslationStatus,
// } from './PhraseTranslationRepository'
// import type { TranscriptionModel } from '../../phrase/repository/PhraseRepository'

/**
 * Реализация PhraseTranslationRepository через REST API.
 */
/*export class PhraseTranslationApi implements PhraseTranslationRepository {
	async getOrCreateTranslation(
		input: GetOrCreateTranslationInput,
		signal?: AbortSignal,
	): Promise<ApiResult<PhraseTranslationModel>> {
		return executeApiCall(
			() => universalPhraseTranslationControllerGetOrCreateTranslation(input, { signal }),
			(data) => mapToPhraseTranslation(data),
		)
	}
}*/

// ─── Mappers ────────────────────────────────────────────────────────────────

/*function mapToPhraseTranslation(raw: UniversalPhraseTranslationOutModel): PhraseTranslationModel {
	return {
		id: raw.id,
		universalPhraseId: raw.universalPhraseId ?? null,
		targetLanguageCode: raw.targetLanguageCode,
		translation: raw.translation as PhraseTranslationDataModel | null,
		status: mapStatus(raw.status),
		errorCode: raw.errorCode ?? null,
		nonExistentWord: raw.nonExistentWord,
		createdAt: raw.createdAt,
		transcription: raw.transcription ? mapToTranscription(raw.transcription) : null,
	}
}*/

/*function mapToTranscription(raw: TranscriptionOutModel): TranscriptionModel {
	return {
		id: raw.id,
		universalPhraseId: raw.universalPhraseId,
		ipa: raw.ipa ?? null,
		pinyin: raw.pinyin ?? null,
	}
}*/

/*function mapStatus(raw: string): TranslationStatus {
	if (raw === 'pending' || raw === 'ready' || raw === 'error') {
		return raw
	}
	return 'error'
}*/
