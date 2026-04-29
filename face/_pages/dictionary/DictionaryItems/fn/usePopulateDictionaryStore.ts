import { useEffect } from 'react'
import { useFlashcard_Get_My, useUniversalPhrase_GetLazyQuery } from '@/graphql'
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

	const { data, loading, error } = useFlashcard_Get_My({
		variables: { input: {} },
		skip: !currentLang,
	})
	const [getUniversalPhrase] = useUniversalPhrase_GetLazyQuery()

	useEffect(() => {
		if (loading) {
			setIsFlashcardsLoading(true)
		}
	}, [loading, setIsFlashcardsLoading])

	useEffect(() => {
		setGetFlashcardsErrorMessage(error?.message ?? '')
	}, [error?.message, setGetFlashcardsErrorMessage])

	useEffect(() => {
		if (error) {
			setIsFlashcardsLoading(false)
		}
	}, [error, setIsFlashcardsLoading])

	useEffect(() => {
		if (!data?.flashcard_get_my) {
			if (!loading && !error) {
				setFlashcards([])
				setIsFlashcardsLoading(false)
			}
			return
		}

		const flashcards = data.flashcard_get_my
		let isCancelled = false

		async function enrichFlashcards() {
			try {
				setIsFlashcardsLoading(true)
				const flashcardsByLang = flashcards.filter((flashcard) => flashcard.languageCode === currentLang)
				const preparedFlashcards = await Promise.all(
					flashcardsByLang.map(async (flashcard): Promise<DictionaryFlashcardData> => {
						let phraseAudioUrl = ''
						let phraseTranscription = flashcard.phraseTranscription ?? ''

						try {
							const phraseResult = await getUniversalPhrase({
								variables: {
									input: {
										phrase: flashcard.phrase,
										languageCode: flashcard.languageCode,
									},
								},
								fetchPolicy: 'network-only',
							})

							phraseAudioUrl = phraseResult.data?.universal_phrase_get.audioPronunciation?.audioUrl ?? ''
							phraseTranscription =
								flashcard.phraseTranscription ??
								phraseResult.data?.universal_phrase_get.transcription?.ipa ??
								phraseResult.data?.universal_phrase_get.transcription?.pinyin ??
								''
						} catch {}

						return {
							id: flashcard.id,
							languageCode: flashcard.languageCode,
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
					setGetFlashcardsErrorMessage(e instanceof Error ? e.message : 'Не удалось загрузить флешкарточки')
					setIsFlashcardsLoading(false)
				}
			}
		}

		enrichFlashcards()

		return () => {
			isCancelled = true
		}
	}, [
		currentLang,
		data,
		error,
		getUniversalPhrase,
		loading,
		setFlashcards,
		setGetFlashcardsErrorMessage,
		setIsFlashcardsLoading,
	])
}
