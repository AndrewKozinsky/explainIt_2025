import type { TranscriptionModel } from '@/entities/phrase/repository/PhraseRepository'
import { universalPhraseService } from '@/entities/universalPhrase/UniversalPhraseService'
import { isAbortError } from '@/shared/utils/fetchData/isAbortError'
import { usePhraseDictionaryStore } from '@/widgets/dictionary/ui/phraseDictionaryStore'

let abortController: AbortController | null = null

/**
 * Получает словарную статью для фразы и кладёт результат в Zustand-стор.
 * Можно вызывать из любого места приложения — данные появятся в сторе после ответа сервера.
 */
export async function fetchDictionaryArticle(phrase: string): Promise<void> {
	const { languageCode, targetLanguageCode } = usePhraseDictionaryStore.getState()
	const text = phrase.trim()

	if (!text || !languageCode || !targetLanguageCode) return

	// Отменяем предыдущий незавершённый запрос
	abortController?.abort()
	abortController = new AbortController()
	const signal = abortController.signal

	usePhraseDictionaryStore.getState().setInputText(text)
	usePhraseDictionaryStore.getState().setStatusLoading()

	try {
		// 1. Получаем или создаём UniversalPhrase (сервис сам кэширует и дедуплицирует)
		const phraseResult = await universalPhraseService.getPhrase(text, languageCode)

		if (!phraseResult.ok) {
			usePhraseDictionaryStore.getState().setError(phraseResult.errorMessage)
			return
		}

		const phraseData = phraseResult.data

		// 2. Запрашиваем перевод через сервис
		const translationResult = await universalPhraseService.getTranslation(
			text,
			languageCode,
			targetLanguageCode,
			signal,
		)

		if (!translationResult.ok) {
			if (translationResult.errorMessage === 'Слово не найдено.') {
				usePhraseDictionaryStore.getState().setNonExistentWord()
				return
			}

			usePhraseDictionaryStore.getState().setError(translationResult.errorMessage)
			return
		}

		const translationData = translationResult.data

		// Транскрипция и озвучка могли прийти вместе с ответами — читаем из кеша сервиса
		const entry = universalPhraseService.getState(text, languageCode)
		const transcriptionFromEntry = entry?.transcription ?? null
		const audioUrl = phraseData.audioPronunciation?.audioUrl ?? null

		let transcriptionModel: TranscriptionModel | null = null
		if (transcriptionFromEntry !== null) {
			transcriptionModel = {
				id: 0,
				universalPhraseId: phraseData.id,
				ipa: transcriptionFromEntry.ipa,
				pinyin: transcriptionFromEntry.pinyin,
			}
		}

		usePhraseDictionaryStore.getState().setTranslationResult(translationData, transcriptionModel, audioUrl)
	} catch (error: unknown) {
		if (isAbortError(error)) return
		usePhraseDictionaryStore.getState().setError('Не удалось получить перевод.')
	}
}
