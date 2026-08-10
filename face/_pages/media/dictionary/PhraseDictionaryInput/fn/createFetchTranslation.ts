// import { universalPhraseService } from '@/entities/universalPhrase/UniversalPhraseService'
// import { isAbortError } from '@/shared/utils/fetchData/isAbortError'
// import type { LanguageCode } from '@/shared/utils/languages'
// import { usePhraseDictionaryStore } from '../../phraseDictionaryStore'

/*type FetchTranslationDeps = {
	/!** Getter — всегда возвращает актуальный sourceLanguageCode *!/
	getSourceLang: () => LanguageCode
	/!** Getter — всегда возвращает актуальный targetLanguageCode (locale) *!/
	getTargetLang: () => string
	/!** Getter — всегда возвращает актуальный AbortSignal *!/
	getAbortSignal: () => AbortSignal | undefined
}*/

/**
 * Создаёт функцию `fetchTranslation`, которая:
 * 1. Проверяет кэш UniversalPhraseService
 * 2. Получает/создаёт UniversalPhrase через universalPhraseService.getPhrase
 * 3. Запрашивает перевод через universalPhraseService.getTranslation
 * 4. Обрабатывает результат: перевод / несуществующее слово / ошибка
 */
/*export function createFetchTranslation(deps: FetchTranslationDeps) {
	const { getSourceLang, getTargetLang, getAbortSignal } = deps

	return async function fetchTranslation(phraseText: string): Promise<void> {
		const sourceLang = getSourceLang()
		const targetLang = getTargetLang()

		if (!sourceLang || !phraseText.trim()) return

		// Проверяем кэш UniversalPhraseService
		const phraseEntry = universalPhraseService.getState(phraseText.trim(), sourceLang)
		const cachedTranslation = phraseEntry?.translations[targetLang]
		if (cachedTranslation?.status === 'ready' && cachedTranslation.data) {
			usePhraseDictionaryStore.getState().setTranslationResult(cachedTranslation.data, null, null)
			return
		}

		usePhraseDictionaryStore.getState().setStatusLoading()

		try {
			// 1. Получаем или создаём UniversalPhrase (сервис сам кэширует и дедуплицирует)
			const phraseResult = await universalPhraseService.getPhrase(phraseText.trim(), sourceLang)

			if (!phraseResult.ok) {
				usePhraseDictionaryStore.getState().setError(phraseResult.errorMessage)
				return
			}

			const phraseData = phraseResult.data

			// 2. Запрашиваем перевод через сервис
			const translationResult = await universalPhraseService.getTranslation(
				phraseText.trim(),
				sourceLang,
				targetLang,
				getAbortSignal(),
			)

			if (!translationResult.ok) {
				// Сервис возвращает ошибку в том числе для nonExistentWord
				// Проверяем состояние entry чтобы различить nonExistentWord
				const entry = universalPhraseService.getState(phraseText.trim(), sourceLang)
				const translationEntry = entry?.translations[targetLang]

				if (translationEntry?.errorMessage === 'Слово не найдено.') {
					usePhraseDictionaryStore.getState().setNonExistentWord()
					return
				}

				usePhraseDictionaryStore.getState().setError(translationResult.errorMessage)
				return
			}

			const translationData = translationResult.data

			// Транскрипция и озвучка могли прийти вместе с ответами — читаем из кеша сервиса
			const entry = universalPhraseService.getState(phraseText.trim(), sourceLang)
			const transcriptionFromEntry = entry?.transcription ?? null
			const audioUrl = phraseData.audioPronunciation?.audioUrl ?? null

			const transcriptionModel =
				transcriptionFromEntry !== null
					? {
							id: 0,
							universalPhraseId: phraseData.id,
							ipa: transcriptionFromEntry.ipa,
							pinyin: transcriptionFromEntry.pinyin,
						}
					: null

			usePhraseDictionaryStore.getState().setTranslationResult(translationData, transcriptionModel, audioUrl)
		} catch (error: unknown) {
			if (isAbortError(error)) return
			usePhraseDictionaryStore.getState().setError('Не удалось получить перевод.')
		}
	}
}*/
