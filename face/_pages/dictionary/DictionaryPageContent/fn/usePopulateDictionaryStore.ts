import { useEffect } from 'react'
import { useFlashcardControllerGetMyFlashcards } from '@/shared/api/generated/flashcard/flashcard'
import type { FlashcardOutModel, UniversalPhraseOutModel } from '@/shared/api/generated/models'
import { universalPhraseControllerGetUniversalPhrase } from '@/shared/api/generated/universal-phrase/universal-phrase'
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

	const { data, isLoading, error } = useFlashcardControllerGetMyFlashcards(
		currentLang ? { languageCode: currentLang } : undefined,
		{ query: { enabled: !!currentLang } },
	)

	useEffect(() => {
		if (isLoading) {
			setIsFlashcardsLoading(true)
		}
	}, [isLoading, setIsFlashcardsLoading])

	useEffect(() => {
		setGetFlashcardsErrorMessage(error ? 'Не удалось загрузить флешкарточки' : '')
	}, [error, setGetFlashcardsErrorMessage])

	useEffect(() => {
		if (error) {
			setIsFlashcardsLoading(false)
		}
	}, [error, setIsFlashcardsLoading])

	useEffect(() => {
		const flashcards = data as unknown as FlashcardOutModel[] | undefined

		if (!flashcards) {
			if (!isLoading && !error) {
				setFlashcards([])
				setIsFlashcardsLoading(false)
			}
			return
		}

		let isCancelled = false

		async function enrichFlashcards() {
			try {
				setIsFlashcardsLoading(true)
				const flashcardsByLang = flashcards!.filter((flashcard) => flashcard.languageCode === currentLang)
				const preparedFlashcards = await Promise.all(
					flashcardsByLang.map(async (flashcard): Promise<DictionaryFlashcardData> => {
						let phraseAudioUrl = ''
						let phraseTranscription = (flashcard.phraseTranscription as unknown as string | null) ?? ''

						try {
							const response = await universalPhraseControllerGetUniversalPhrase({
								text: flashcard.phrase,
								sourceLanguageCode: flashcard.languageCode ?? '',
							})

							const phraseData = response as unknown as UniversalPhraseOutModel | null

							phraseAudioUrl = phraseData?.audioPronunciation?.audioUrl ?? ''
							phraseTranscription =
								(flashcard.phraseTranscription as unknown as string | null) ??
								(phraseData?.transcription?.ipa as unknown as string | undefined) ??
								(phraseData?.transcription?.pinyin as unknown as string | undefined) ??
								''
						} catch {
							/* ignore individual phrase fetch errors */
						}

						return {
							id: flashcard.id,
							languageCode: flashcard.languageCode ?? '',
							sentenceText: getSentenceTextParts(
								flashcard.sentenceText,
								flashcard.phraseStartOffset,
								flashcard.phraseEndOffset,
							),
							sentenceTranslation: (flashcard.sentenceTranslation as unknown as string | null) ?? '',
							phrase: flashcard.phrase,
							phraseStartOffset: flashcard.phraseStartOffset,
							phraseEndOffset: flashcard.phraseEndOffset,
							phraseTranslation: (flashcard.phraseTranslation as unknown as string | null) ?? '',
							phraseTranscription,
							phraseAudioUrl,
							examples: (flashcard.examples as unknown as { text: string; translate: string }[]).map(
								(example) => ({
									text: example.text,
									translate: example.translate,
								}),
							),
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

		enrichFlashcards()

		return () => {
			isCancelled = true
		}
	}, [currentLang, data, error, isLoading, setFlashcards, setGetFlashcardsErrorMessage, setIsFlashcardsLoading])
}
