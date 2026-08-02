import { useEffect, useMemo } from 'react'
import { FlashcardApi } from '@/entites/flashcard/repository/FlashcardApi'
import type { FlashcardModel } from '@/entites/flashcard/repository/FlashcardRepository'
import { PhraseApi } from '@/entites/phrase/repository/PhraseApi'
import type { PhraseModel } from '@/entites/phrase/repository/PhraseRepository'
import { useFetchData } from '@/shared/utils/fetchData/useFetchData'
import { DictionaryFlashcardData, useDictionaryStore } from '../../dictionaryStore'

function getSentenceTextParts(sentenceText: string, phraseStartOffset: number, phraseEndOffset: number) {
	return [
		{ type: 'text' as const, value: sentenceText.slice(0, phraseStartOffset) },
		{ type: 'phrase' as const, value: sentenceText.slice(phraseStartOffset, phraseEndOffset) },
		{ type: 'text' as const, value: sentenceText.slice(phraseEndOffset) },
	].filter((part) => part.value)
}

export function usePopulateDictionaryStore() {
	const currentLang = useDictionaryStore((state) => state.currentLang)
	const setFlashcards = useDictionaryStore((state) => state.setFlashcards)
	const setIsFlashcardsLoading = useDictionaryStore((state) => state.setIsFlashcardsLoading)
	const setGetFlashcardsErrorMessage = useDictionaryStore((state) => state.setGetFlashcardsErrorMessage)

	const flashcardApi = useMemo(() => new FlashcardApi(), [])
	const phraseApi = useMemo(() => new PhraseApi(), [])

	const { loading, error, data } = useFetchData(
		() =>
			flashcardApi.getMyFlashcards(
				currentLang ? { languageCode: currentLang } : undefined,
			),
		[flashcardApi, currentLang],
		{ enabled: !!currentLang },
	)

	useEffect(() => {
		setIsFlashcardsLoading(loading)
	}, [loading, setIsFlashcardsLoading])

	useEffect(() => {
		setGetFlashcardsErrorMessage(error ? error : '')
	}, [error, setGetFlashcardsErrorMessage])

	useEffect(() => {
		if (!data) {
			if (!loading && !error) {
				setFlashcards([])
				setIsFlashcardsLoading(false)
			}
			return
		}

		let isCancelled = false

		async function enrichFlashcards(flashcards: FlashcardModel[]) {
			try {
				setIsFlashcardsLoading(true)
				const flashcardsByLang = flashcards.filter((f) => f.languageCode === currentLang)
				const preparedFlashcards = await Promise.all(
					flashcardsByLang.map(async (flashcard): Promise<DictionaryFlashcardData> => {
						let phraseAudioUrl = ''
						let phraseTranscription = flashcard.phraseTranscription ?? ''

						const phraseResult = await phraseApi.resolvePhrase(
							flashcard.phrase,
							flashcard.languageCode ?? '',
						)

						if (phraseResult.data) {
							const phrase: PhraseModel = phraseResult.data
							phraseAudioUrl = phrase.audioPronunciation?.audioUrl ?? ''
							phraseTranscription =
								flashcard.phraseTranscription ??
								phrase.transcription?.ipa ??
								phrase.transcription?.pinyin ??
								''
						}

						return {
							id: flashcard.id,
							languageCode: flashcard.languageCode ?? '',
							sentenceText: getSentenceTextParts(
								flashcard.sentenceText,
								flashcard.phraseStartOffset,
								flashcard.phraseEndOffset,
							),
							sentenceTranslation: flashcard.sentenceTranslation ?? '',
							phrase: flashcard.phrase,
							phraseStartOffset: flashcard.phraseStartOffset,
							phraseEndOffset: flashcard.phraseEndOffset,
							phraseTranslation: flashcard.phraseTranslation ?? '',
							phraseTranscription,
							phraseAudioUrl,
							examples: flashcard.examples.map((example) => ({
								text: example.text,
								translate: example.translate,
							})),
						}
					}),
				)

				if (!isCancelled) {
					setFlashcards(preparedFlashcards)
					setIsFlashcardsLoading(false)
				}
			} catch (e) {
				if (!isCancelled) {
					setFlashcards([])
					setGetFlashcardsErrorMessage('Не удалось загрузить флешкарточки')
					setIsFlashcardsLoading(false)
				}
			}
		}

		enrichFlashcards(data)

		return () => {
			isCancelled = true
		}
	}, [currentLang, data, loading, error, setFlashcards, setGetFlashcardsErrorMessage, setIsFlashcardsLoading, phraseApi])
}
