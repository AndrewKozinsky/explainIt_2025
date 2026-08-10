// import { useEffect } from 'react'
// import { useLocale } from 'next-intl'
// import { makePhraseId, SentencePhraseType, useDetailsStore } from '@/entities/detailsBlock/detailsStore'
// import { translateApi } from '@/entities/translate/repository/TranslateApi'
// import { mapPhraseTranslationToStatus } from './fetchSentenceTranslation'
// import { findSentenceEntry } from './selectors'
// import { offsetsFromWordIds } from './wordSegmentation'

/*export function useFetchCurrentPhraseTranslation() {
	const currentSentenceId = useDetailsStore((s) => s.currentSentenceId)
	const currentSentenceText = useDetailsStore((s) => s.currentSentenceText)
	const currentWordId = useDetailsStore((s) => s.currentWordId)
	const retryFetchPhraseQueue = useDetailsStore((s) => s.retryFetchPhraseQueue)
	const locale = useLocale()

	useEffect(
		function () {
			if (currentSentenceId === null || currentSentenceText === null || currentWordId === null) return

			const state = useDetailsStore.getState()

			const sentence = findSentenceEntry({
				sentences: state.sentences,
				sentenceId: currentSentenceId,
			})
			if (!sentence) return

			const phrase = sentence.data.phrases.find((p) => p.wordIds.includes(currentWordId))
			if (phrase) {
				state.setSelectedPhraseId({
					sentenceId: currentSentenceId,
					phraseId: phrase.randomGeneratedPhraseId,
				})

				return
			}

			const wordOffsets = offsetsFromWordIds({
				sentenceText: currentSentenceText,
				locale: state.languageCode,
				wordIds: [currentWordId],
			})
			if (!wordOffsets) return

			const phraseId = makePhraseId()

			state.upsertPhraseTranslation({
				sentenceId: currentSentenceId,
				phrase: {
					randomGeneratedPhraseId: phraseId,
					sentencePhraseId: null,
					flashcardId: null,
					wordIds: [currentWordId],
					phrase: wordOffsets.text || null,
					loading: true,
					error: null,
					translation: null,
					examples: [],
				},
			})

			state.setSelectedPhraseId({
				sentenceId: currentSentenceId,
				phraseId,
			})

			void runFetchForPhrase({
				sentenceId: currentSentenceId,
				sentenceText: currentSentenceText,
				phraseId,
				wordStartOffset: wordOffsets.startOffset,
				wordEndOffset: wordOffsets.endOffset,
				bookName: state.bookName,
				bookAuthor: state.bookAuthor,
				videoName: state.videoName,
				languageCode: state.languageCode,
				targetLanguageCode: locale,
			})
		},
		[currentSentenceId, currentSentenceText, currentWordId],
	)

	// Process retry queue: phrases that the user explicitly asked to re-fetchData.
	useEffect(
		function () {
			if (retryFetchPhraseQueue.length === 0) return

			const state = useDetailsStore.getState()

			for (const item of retryFetchPhraseQueue) {
				const wordOffsets = offsetsFromWordIds({
					sentenceText: item.sentenceText,
					locale: state.languageCode,
					wordIds: item.wordIds,
				})
				if (!wordOffsets) continue

				void runFetchForPhrase({
					sentenceId: item.sentenceId,
					sentenceText: item.sentenceText,
					phraseId: item.randomGeneratedPhraseId,
					wordStartOffset: wordOffsets.startOffset,
					wordEndOffset: wordOffsets.endOffset,
					bookName: state.bookName,
					bookAuthor: state.bookAuthor,
					videoName: state.videoName,
					languageCode: state.languageCode,
					targetLanguageCode: locale,
				}).catch(function () {})
			}

			useDetailsStore.getState().updateStore({ retryFetchPhraseQueue: [] })
		},
		[retryFetchPhraseQueue],
	)
}*/

/*type RunFetchForPhraseInput = {
	sentenceId: number
	sentenceText: string
	phraseId: string
	wordStartOffset: number
	wordEndOffset: number
	bookName: null | string
	bookAuthor: null | string
	videoName: null | string
	languageCode: null | string
	targetLanguageCode: string
}*/

/*async function runFetchForPhrase(input: RunFetchForPhraseInput): Promise<void> {
	try {
		const phrase = await getOrCreatePhraseTranslation(input)
		// console.log({ phrase })

		useDetailsStore.getState().finalizePhraseTranslation({
			sentenceId: input.sentenceId,
			placeholderPhraseId: input.phraseId,
			phrase,
		})
	} catch (error) {
		useDetailsStore.getState().patchPhraseTranslation({
			sentenceId: input.sentenceId,
			phraseId: input.phraseId,
			patch: {
				loading: false,
				error: error as string,
			},
		})
	}
}*/

/*async function getOrCreatePhraseTranslation(input: RunFetchForPhraseInput): Promise<SentencePhraseType> {
	const existingResult = await translateApi.getPhraseTranslation({
		sentenceId: input.sentenceId,
		targetLanguageCode: input.targetLanguageCode,
		selectedWordStartOffset: input.wordStartOffset,
		selectedWordEndOffset: input.wordEndOffset,
	})

	if (existingResult.data?.translation) {
		return mapPhraseTranslationToStatus({
			phraseTranslation: existingResult.data,
			sentenceText: input.sentenceText,
			languageCode: input.languageCode,
		})
	}

	const selectedWord = input.sentenceText.slice(input.wordStartOffset, input.wordEndOffset)

	const generatedResult = await translateApi.translatePhrase({
		sentenceId: input.sentenceId,
		text: input.sentenceText,
		selectedWord,
		targetLanguageCode: input.targetLanguageCode,
		selectedWordStartOffset: input.wordStartOffset,
		selectedWordEndOffset: input.wordEndOffset,
		bookName: input.bookName,
		bookAuthor: input.bookAuthor,
		videoName: input.videoName,
	})

	if (generatedResult.error || !generatedResult.data.translation) {
		throw new Error('Не удалось получить перевод слова')
	}

	return mapPhraseTranslationToStatus({
		phraseTranslation: generatedResult.data,
		sentenceText: input.sentenceText,
		languageCode: input.languageCode,
	})
}*/
