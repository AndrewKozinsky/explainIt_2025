// import type {
// 	CreateUniversalPhraseInput,
// 	TranscriptionOutModel,
// 	UniversalAudioPronunciationOutModel,
// 	UniversalPhraseOutModel,
// } from '@/shared/api/generated/models'
// import {
// 	universalPhraseControllerCreateUniversalPhrase,
// 	universalPhraseControllerGetUniversalPhrase,
// } from '@/shared/api/generated/universal-phrase/universal-phrase'
// import { universalPhraseAudioControllerGetOrCreateAudio } from '@/shared/api/generated/universal-phrase-audio/universal-phrase-audio'
// import { universalPhraseTranscriptionControllerGetOrCreateTranscription } from '@/shared/api/generated/universal-phrase-transcription/universal-phrase-transcription'
// import { executeApiCall } from '@/shared/utils/fetchData/executeApiCall'
// import type { ApiResult } from '@/shared/utils/fetchData/executeApiCall'
// import type { AudioPronunciationModel, PhraseModel, PhraseRepository, TranscriptionModel } from './PhraseRepository'

/**
 * Реализация PhraseRepository через REST API.
 */
/*export class PhraseApi implements PhraseRepository {
	async resolvePhrase(text: string, sourceLanguageCode: string): Promise<ApiResult<PhraseModel | null>> {
		const getResult = await executeApiCall(
			() => universalPhraseControllerGetUniversalPhrase({ text, sourceLanguageCode }),
			(data) => (data ? mapToPhrase(data) : null),
		)

		if (getResult.data) return getResult

		return executeApiCall(
			() =>
				universalPhraseControllerCreateUniversalPhrase({
					text,
					sourceLanguageCode,
				} as CreateUniversalPhraseInput),
			(data) => mapToPhrase(data),
		)
	}

	async getOrCreateTranscription(universalPhraseId: number): Promise<ApiResult<TranscriptionModel>> {
		return executeApiCall(
			() => universalPhraseTranscriptionControllerGetOrCreateTranscription({ universalPhraseId }),
			(data) => mapToTranscription(data),
		)
	}

	async getOrCreateAudio(universalPhraseId: number): Promise<ApiResult<AudioPronunciationModel>> {
		return executeApiCall(
			() => universalPhraseAudioControllerGetOrCreateAudio({ universalPhraseId }),
			(data) => mapToAudio(data),
		)
	}
}*/

// ─── Mappers ────────────────────────────────────────────────────────────────

/*function mapToPhrase(raw: UniversalPhraseOutModel): PhraseModel {
	return {
		id: raw.id,
		text: raw.text,
		sourceLanguageCode: raw.sourceLanguageCode,
		transcription: raw.transcription ? mapToTranscription(raw.transcription) : null,
		audioPronunciation: raw.audioPronunciation ? mapToAudio(raw.audioPronunciation) : null,
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

/*function mapToAudio(raw: UniversalAudioPronunciationOutModel): AudioPronunciationModel {
	return {
		id: raw.id,
		universalPhraseId: raw.universalPhraseId,
		audioUrl: raw.audioUrl,
	}
}*/
