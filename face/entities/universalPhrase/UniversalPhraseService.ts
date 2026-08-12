import { PhraseApi } from '@/entities/phrase/repository/PhraseApi'
import type {
	AudioPronunciationModel,
	PhraseModel,
	TranscriptionModel,
} from '@/entities/phrase/repository/PhraseRepository'
// import { PhraseTranslationApi } from '@/entities/universalPhrase/repository/PhraseTranslationApi'
import { PhraseTranslationDataModel } from '@/entities/universalPhrase/repository/PhraseTranslationRepository'
// import { DeepSeekModels } from '@/shared/api/AIModels'
import { LanguageCode } from '@/shared/utils/languages'

// ─── Types ────────────────────────────────────────────────────────────────────

export type EntryStatus = 'idle' | 'loading' | 'ready' | 'error'

export type ServiceResult<T> = { ok: true; data: T } | { ok: false; errorMessage: string }

export type TranscriptionData = {
	ipa: string | null
	pinyin: string | null
}

/*export type AudioData = {
	audioUrl: string
}*/

export type PhraseData = {
	id: number
	text: string
	sourceLanguageCode: string
	transcription: TranscriptionData | null
	audioPronunciation: AudioData | null
}

/*export type PreloadItem = {
	phrase: string
	languageCode: LanguageCode
	transcription?: string
	audioUrl?: string | null
}*/

export type TranslationEntryData = {
	data: PhraseTranslationDataModel | null
	status: EntryStatus
	errorMessage: string | null
}

export type PhraseEntry = {
	phrase: string
	languageCode: LanguageCode
	phraseId: number | null
	phraseStatus: EntryStatus
	phraseErrorMessage: string | null

	transcription: TranscriptionData | null
	transcriptionStatus: EntryStatus
	transcriptionErrorMessage: string | null

	audioUrl: string | null
	audioStatus: EntryStatus
	audioErrorMessage: string | null

	translations: Record<string, TranslationEntryData>
}

// ─── Service ──────────────────────────────────────────────────────────────────

export class UniversalPhraseService {
	#entries = new Map<string, PhraseEntry>()

	#phraseRequests = new Map<string, Promise<ServiceResult<PhraseData>>>()
	#transcriptionRequests = new Map<string, Promise<ServiceResult<TranscriptionData>>>()
	#audioRequests = new Map<string, Promise<ServiceResult<AudioData>>>()
	// #translationRequests = new Map<string, Promise<ServiceResult<PhraseTranslationDataModel>>>()

	#phraseApi = new PhraseApi()
	// #translationApi = new PhraseTranslationApi()

	// ─── getPhrase ────────────────────────────────────────────────────────

	async getPhrase(phrase: string, languageCode: LanguageCode): Promise<ServiceResult<PhraseData>> {
		const key = makePhraseKey(phrase, languageCode)

		// Already cached
		const entry = this.#entries.get(key)
		if (entry && entry.phraseStatus === 'ready' && entry.phraseId !== null) {
			return { ok: true, data: buildPhraseData(entry) }
		}

		// Dedup inflight
		const inflight = this.#phraseRequests.get(key)
		if (inflight) return inflight

		const promise = this.#executeGetPhrase(key, phrase, languageCode)
		this.#phraseRequests.set(key, promise)

		try {
			return await promise
		} finally {
			this.#phraseRequests.delete(key)
		}
	}

	async #executeGetPhrase(
		key: string,
		phrase: string,
		languageCode: LanguageCode,
	): Promise<ServiceResult<PhraseData>> {
		const entry = this.#ensureEntry(key, phrase, languageCode)

		entry.phraseStatus = 'loading'
		entry.phraseErrorMessage = null

		const result = await this.#phraseApi.resolvePhrase(phrase, languageCode)

		if (result.error || result.errors) {
			entry.phraseStatus = 'error'
			entry.phraseErrorMessage = result.error ?? 'Не удалось найти или создать фразу.'
			return { ok: false, errorMessage: entry.phraseErrorMessage }
		}

		const model: PhraseModel | null = result.data

		if (!model) {
			entry.phraseStatus = 'error'
			entry.phraseErrorMessage = 'Не удалось найти или создать фразу.'
			return { ok: false, errorMessage: entry.phraseErrorMessage }
		}

		entry.phraseId = model.id
		entry.phraseStatus = 'ready'

		// Сохраняем транскрипцию, если пришла в ответе
		if (model.transcription) {
			entry.transcription = mapModelToTranscriptionData(model.transcription)
			entry.transcriptionStatus = 'ready'
		}

		// Сохраняем озвучку, если пришла в ответе
		if (model.audioPronunciation) {
			entry.audioUrl = model.audioPronunciation.audioUrl
			entry.audioStatus = 'ready'
		}

		return { ok: true, data: buildPhraseData(entry) }
	}

	// ─── getTranscription ─────────────────────────────────────────────────

	async getTranscription(phrase: string, languageCode: LanguageCode): Promise<ServiceResult<TranscriptionData>> {
		const key = makePhraseKey(phrase, languageCode)

		// Already cached
		const entry = this.#entries.get(key)
		if (entry && entry.transcriptionStatus === 'ready' && entry.transcription) {
			return { ok: true, data: entry.transcription }
		}

		// Dedup inflight
		const inflight = this.#transcriptionRequests.get(key)
		if (inflight) return inflight

		const promise = this.#executeGetTranscription(key, phrase, languageCode)
		this.#transcriptionRequests.set(key, promise)

		try {
			return await promise
		} finally {
			this.#transcriptionRequests.delete(key)
		}
	}

	async #executeGetTranscription(
		key: string,
		phrase: string,
		languageCode: LanguageCode,
	): Promise<ServiceResult<TranscriptionData>> {
		const entry = this.#ensureEntry(key, phrase, languageCode)

		// Сначала убеждаемся, что фраза существует
		if (entry.phraseId === null) {
			const phraseResult = await this.getPhrase(phrase, languageCode)
			if (!phraseResult.ok) {
				entry.transcriptionStatus = 'error'
				entry.transcriptionErrorMessage = phraseResult.errorMessage
				return { ok: false, errorMessage: phraseResult.errorMessage }
			}
		}

		// После getPhrase транскрипция могла уже прийти
		const updated = this.#entries.get(key)!
		if (updated.transcription) {
			return { ok: true, data: updated.transcription }
		}

		updated.transcriptionStatus = 'loading'
		updated.transcriptionErrorMessage = null

		const result = await this.#phraseApi.getOrCreateTranscription(updated.phraseId!)

		if (result.error || result.errors) {
			updated.transcriptionStatus = 'error'
			updated.transcriptionErrorMessage = result.error ?? 'Не удалось получить транскрипцию.'
			return { ok: false, errorMessage: updated.transcriptionErrorMessage }
		}

		const model: TranscriptionModel = result.data
		const transcription = mapModelToTranscriptionData(model)

		updated.transcription = transcription
		updated.transcriptionStatus = 'ready'

		return { ok: true, data: transcription }
	}

	// ─── getAudio ─────────────────────────────────────────────────────────

	async getAudio(phrase: string, languageCode: LanguageCode): Promise<ServiceResult<AudioData>> {
		const key = makePhraseKey(phrase, languageCode)

		// Already cached
		const entry = this.#entries.get(key)
		if (entry && entry.audioUrl && entry.audioStatus === 'ready') {
			return { ok: true, data: { audioUrl: entry.audioUrl } }
		}

		// Dedup inflight
		const inflight = this.#audioRequests.get(key)
		if (inflight) return inflight

		const promise = this.#executeGetAudio(key, phrase, languageCode)
		this.#audioRequests.set(key, promise)

		try {
			return await promise
		} finally {
			this.#audioRequests.delete(key)
		}
	}

	async #executeGetAudio(key: string, phrase: string, languageCode: LanguageCode): Promise<ServiceResult<AudioData>> {
		const entry = this.#ensureEntry(key, phrase, languageCode)

		// Сначала убеждаемся, что фраза существует
		if (entry.phraseId === null) {
			const phraseResult = await this.getPhrase(phrase, languageCode)
			if (!phraseResult.ok) {
				entry.audioStatus = 'error'
				entry.audioErrorMessage = phraseResult.errorMessage
				return { ok: false, errorMessage: phraseResult.errorMessage }
			}
		}

		// После getPhrase озвучка могла уже прийти
		const updated = this.#entries.get(key)!
		if (updated.audioUrl) {
			return { ok: true, data: { audioUrl: updated.audioUrl } }
		}

		updated.audioStatus = 'loading'
		updated.audioErrorMessage = null

		const result = await this.#phraseApi.getOrCreateAudio(updated.phraseId!)

		if (result.error || result.errors) {
			updated.audioStatus = 'error'
			updated.audioErrorMessage = result.error ?? 'Не удалось получить озвучку.'
			return { ok: false, errorMessage: updated.audioErrorMessage }
		}

		const model: AudioPronunciationModel = result.data
		const audioUrl = model.audioUrl

		updated.audioUrl = audioUrl
		updated.audioStatus = audioUrl ? 'ready' : 'error'

		if (!audioUrl) {
			return { ok: false, errorMessage: 'URL озвучки пуст.' }
		}

		return { ok: true, data: { audioUrl } }
	}

	// ─── getTranslation ───────────────────────────────────────────────────

	/*async getTranslation(
		phrase: string,
		sourceLanguageCode: LanguageCode,
		targetLanguageCode: string,
		signal?: AbortSignal,
	): Promise<ServiceResult<PhraseTranslationDataModel>> {
		const phraseKey = makePhraseKey(phrase, sourceLanguageCode)
		const translationKey = makeTranslationKey(phrase, sourceLanguageCode, targetLanguageCode)

		// Already cached
		const entry = this.#entries.get(phraseKey)
		const translationEntry = entry?.translations[targetLanguageCode]
		if (translationEntry && translationEntry.status === 'ready' && translationEntry.data) {
			return { ok: true, data: translationEntry.data }
		}

		// Dedup inflight
		const inflight = this.#translationRequests.get(translationKey)
		if (inflight) return inflight

		const promise = this.#executeGetTranslation(phraseKey, phrase, sourceLanguageCode, targetLanguageCode, signal)
		this.#translationRequests.set(translationKey, promise)

		try {
			return await promise
		} finally {
			this.#translationRequests.delete(translationKey)
		}
	}*/

	/*async #executeGetTranslation(
		phraseKey: string,
		phrase: string,
		sourceLanguageCode: LanguageCode,
		targetLanguageCode: string,
		signal?: AbortSignal,
	): Promise<ServiceResult<PhraseTranslationDataModel>> {
		const entry = this.#ensureEntry(phraseKey, phrase, sourceLanguageCode)

		// Сначала убеждаемся, что фраза существует
		if (entry.phraseId === null) {
			const phraseResult = await this.getPhrase(phrase, sourceLanguageCode)
			if (!phraseResult.ok) {
				const translationEntry = this.#ensureTranslationEntry(entry, targetLanguageCode)
				translationEntry.status = 'error'
				translationEntry.errorMessage = phraseResult.errorMessage
				return { ok: false, errorMessage: phraseResult.errorMessage }
			}
		}

		const updated = this.#entries.get(phraseKey)!
		const translationEntry = this.#ensureTranslationEntry(updated, targetLanguageCode)

		translationEntry.status = 'loading'
		translationEntry.errorMessage = null

		const result = await this.#translationApi.getOrCreateTranslation(
			{
				universalPhraseId: updated.phraseId!,
				targetLanguageCode,
				model: DeepSeekModels.Flash,
			},
			signal,
		)

		if (result.error || result.errors) {
			translationEntry.status = 'error'
			translationEntry.errorMessage = result.error ?? 'Не удалось получить перевод.'
			return { ok: false, errorMessage: translationEntry.errorMessage }
		}

		const translation = result.data

		if (!translation) {
			translationEntry.status = 'error'
			translationEntry.errorMessage = 'Неизвестная ошибка сервера.'
			return { ok: false, errorMessage: translationEntry.errorMessage }
		}

		if (translation.status === 'error' || translation.errorCode) {
			translationEntry.status = 'error'
			translationEntry.errorMessage = 'Не удалось получить перевод.'
			return { ok: false, errorMessage: translationEntry.errorMessage }
		}

		if (translation.nonExistentWord) {
			translationEntry.status = 'error'
			translationEntry.errorMessage = 'Слово не найдено.'
			return { ok: false, errorMessage: translationEntry.errorMessage }
		}

		if (translation.translation) {
			translationEntry.data = translation.translation
			translationEntry.status = 'ready'

			// Транскрипция может прийти вместе с переводом — сохраняем в entry
			if (translation.transcription) {
				updated.transcription = mapModelToTranscriptionData(translation.transcription)
				updated.transcriptionStatus = 'ready'
			}

			return { ok: true, data: translation.translation }
		}

		translationEntry.status = 'error'
		translationEntry.errorMessage = 'Перевод не был получен.'
		return { ok: false, errorMessage: translationEntry.errorMessage }
	}*/

	// ─── getState (синхронное чтение) ─────────────────────────────────────

	/*getState(phrase: string, languageCode: LanguageCode): PhraseEntry | undefined {
		return this.#entries.get(makePhraseKey(phrase, languageCode))
	}*/

	// ─── ensureEntry ──────────────────────────────────────────────────────

	#ensureEntry(key: string, phrase: string, languageCode: LanguageCode): PhraseEntry {
		const existing = this.#entries.get(key)
		if (existing) return existing

		const entry = createEmptyEntry(phrase, languageCode)
		this.#entries.set(key, entry)

		return entry
	}

	/*#ensureTranslationEntry(entry: PhraseEntry, targetLanguageCode: string): TranslationEntryData {
		if (!entry.translations[targetLanguageCode]) {
			entry.translations[targetLanguageCode] = createEmptyTranslationEntry()
		}

		return entry.translations[targetLanguageCode]
	}*/

	// ─── preload ──────────────────────────────────────────────────────────

	/*preload(items: PreloadItem[]): void {
		for (const item of items) {
			const key = makePhraseKey(item.phrase, item.languageCode)
			const existing = this.#entries.get(key)

			if (existing && existing.phraseId !== null) {
				// Дополняем существующую запись недостающими данными
				if (!existing.transcription && item.transcription) {
					existing.transcription = { ipa: item.transcription, pinyin: null }
					existing.transcriptionStatus = 'ready'
				}
				if (!existing.audioUrl && item.audioUrl) {
					existing.audioUrl = item.audioUrl
					existing.audioStatus = 'ready'
				}
			} else if (!existing) {
				// Создаём новую запись с предзагруженными данными
				const entry = createEmptyEntry(item.phrase, item.languageCode)

				if (item.transcription) {
					entry.transcription = { ipa: item.transcription, pinyin: null }
					entry.transcriptionStatus = 'ready'
				}
				if (item.audioUrl) {
					entry.audioUrl = item.audioUrl
					entry.audioStatus = 'ready'
				}

				this.#entries.set(key, entry)
			}
		}
	}*/
}

// ─── Singleton ────────────────────────────────────────────────────────────────

export const universalPhraseService = new UniversalPhraseService()

// ─── Helpers ──────────────────────────────────────────────────────────────────

function buildPhraseData(entry: PhraseEntry): PhraseData {
	return {
		id: entry.phraseId!,
		text: entry.phrase,
		sourceLanguageCode: entry.languageCode,
		transcription: entry.transcription,
		audioPronunciation: entry.audioUrl ? { audioUrl: entry.audioUrl } : null,
	}
}

function mapModelToTranscriptionData(model: TranscriptionModel): TranscriptionData {
	return {
		ipa: model.ipa,
		pinyin: model.pinyin,
	}
}

/*function createEmptyTranslationEntry(): TranslationEntryData {
	return {
		data: null,
		status: 'idle',
		errorMessage: null,
	}
}*/

export function makePhraseKey(phrase: string, languageCode: LanguageCode): string {
	return `${languageCode}:${phrase.trim().toLocaleLowerCase()}`
}

/*function makeTranslationKey(phrase: string, sourceLanguageCode: LanguageCode, targetLanguageCode: string): string {
	return `${makePhraseKey(phrase, sourceLanguageCode)}:${targetLanguageCode}`
}*/

function createEmptyEntry(phrase: string, languageCode: LanguageCode): PhraseEntry {
	return {
		phrase,
		languageCode,
		phraseId: null,
		phraseStatus: 'idle',
		phraseErrorMessage: null,
		transcription: null,
		transcriptionStatus: 'idle',
		transcriptionErrorMessage: null,
		audioUrl: null,
		audioStatus: 'idle',
		audioErrorMessage: null,
		translations: {},
	}
}
