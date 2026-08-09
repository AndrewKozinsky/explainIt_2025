import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { flashcardQueries } from '@/entities/flashcard/FlashcardQueryFacade'
import type { FlashcardModel } from '@/entities/flashcard/FlashcardService'
import { universalPhraseService } from '@/entities/universalPhrase/UniversalPhraseService'
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
	const { data, error, isLoading } = useQuery({
		...flashcardQueries.getMyFlashcards(currentLang ? { languageCode: currentLang } : undefined),
		enabled: !!currentLang,
	})

	useEffect(() => {
		setIsFlashcardsLoading(isLoading)
	}, [isLoading, setIsFlashcardsLoading])

	useEffect(() => {
		setGetFlashcardsErrorMessage(error instanceof Error ? error.message : '')
	}, [error, setGetFlashcardsErrorMessage])

	useEffect(() => {
		if (!data) {
			if (!isLoading && !error) {
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

						const phraseResult = await universalPhraseService.getPhrase(flashcard.phrase, currentLang)

						if (phraseResult.ok) {
							const phrase = phraseResult.data
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
	}, [currentLang, data, isLoading, error, setFlashcards, setGetFlashcardsErrorMessage, setIsFlashcardsLoading])
}
