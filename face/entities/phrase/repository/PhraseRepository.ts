import type { ApiResult } from '@/shared/utils/fetchData/executeApiCall'

/**
 * Унифицированная модель фразы — не зависит от API.
 */
export type PhraseModel = {
	id: number
	text: string
	sourceLanguageCode: string
	transcription: TranscriptionModel | null
	audioPronunciation: AudioPronunciationModel | null
}

/**
 * Модель транскрипции.
 */
export type TranscriptionModel = {
	id: number
	universalPhraseId: number
	ipa: string | null
	pinyin: string | null
}

/**
 * Модель аудио-произношения.
 */
export type AudioPronunciationModel = {
	id: number
	universalPhraseId: number
	audioUrl: string
}

/**
 * Репозиторий фраз — абстракция над серверным API.
 */
export type PhraseRepository = {
	/**
	 * Получить существующую фразу или создать новую.
	 * null — фраза не найдена и не может быть создана.
	 */
	resolvePhrase(text: string, sourceLanguageCode: string): Promise<ApiResult<PhraseModel | null>>

	/** Получить или создать транскрипцию для фразы */
	getOrCreateTranscription(universalPhraseId: number): Promise<ApiResult<TranscriptionModel>>

	/** Получить или создать аудио-произношение для фразы */
	getOrCreateAudio(universalPhraseId: number): Promise<ApiResult<AudioPronunciationModel>>
}
