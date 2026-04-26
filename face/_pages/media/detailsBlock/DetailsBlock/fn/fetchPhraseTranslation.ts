import { useEffect } from 'react'
import { useTranslate_Get_Phrase_TranslationLazyQuery, useTranslate_Translate_Phrase } from '@/graphql'
import { useDetailsStore } from '_pages/media/detailsBlock/detailsStore'
import { mapPhraseTranslationToStatus, toNullableString } from './fetchSentenceTranslation'
import { findCoveringPhrase, findSentenceEntry } from './selectors'

export function useFetchCurrentPhraseTranslation() {
	const currentSentenceId = useDetailsStore((s) => s.currentSentenceId)
	const currentWordStartOffset = useDetailsStore((s) => s.currentWordStartOffset)
	const currentWordEndOffset = useDetailsStore((s) => s.currentWordEndOffset)

	const [getPhraseTranslation] = useTranslate_Get_Phrase_TranslationLazyQuery()
	const [translatePhrase] = useTranslate_Translate_Phrase()

	useEffect(
		function () {
			if (currentSentenceId === null) return
			if (currentWordStartOffset === null || currentWordEndOffset === null) return

			const state = useDetailsStore.getState()

			const entry = findSentenceEntry({
				sentences: state.sentences,
				sentenceId: currentSentenceId,
			})
			if (!entry) return

			const coveringPhrase = findCoveringPhrase({
				phrases: entry.data.phrases,
				startOffset: currentWordStartOffset,
				endOffset: currentWordEndOffset,
			})
			if (coveringPhrase) return

			void runFetchForPhrase({
				sentenceId: currentSentenceId,
				sentenceText: entry.data.sentence.text,
				wordStartOffset: currentWordStartOffset,
				wordEndOffset: currentWordEndOffset,
				bookName: state.bookName,
				bookAuthor: state.bookAuthor,
				videoName: state.videoName,
				videoYear: state.videoYear,
				getPhraseTranslation,
				translatePhrase,
			})
		},
		[currentSentenceId, currentWordStartOffset, currentWordEndOffset],
	)
}

type RunFetchForPhraseInput = {
	sentenceId: number
	sentenceText: string
	wordStartOffset: number
	wordEndOffset: number
	bookName: null | string
	bookAuthor: null | string
	videoName: null | string
	videoYear: null | string | number
	getPhraseTranslation: ReturnType<typeof useTranslate_Get_Phrase_TranslationLazyQuery>[0]
	translatePhrase: ReturnType<typeof useTranslate_Translate_Phrase>[0]
}

async function runFetchForPhrase(input: RunFetchForPhraseInput): Promise<void> {
	const store = useDetailsStore.getState()

	const placeholderLocator = {
		startOffset: input.wordStartOffset,
		endOffset: input.wordEndOffset,
	}

	store.upsertPhraseTranslation({
		sentenceId: input.sentenceId,
		locator: placeholderLocator,
		phrase: {
			startOffset: input.wordStartOffset,
			endOffset: input.wordEndOffset,
			phrase: input.sentenceText.slice(input.wordStartOffset, input.wordEndOffset) || null,
			loading: true,
			error: null,
			translation: null,
			examples: [],
		},
	})

	try {
		const phrase = await getOrCreatePhraseTranslation(input)

		useDetailsStore.getState().upsertPhraseTranslation({
			sentenceId: input.sentenceId,
			locator: placeholderLocator,
			phrase,
		})
	} catch (error) {
		useDetailsStore.getState().patchPhraseTranslation({
			sentenceId: input.sentenceId,
			locator: placeholderLocator,
			patch: {
				loading: false,
				error: error instanceof Error ? error.message : 'Unknown error',
			},
		})
	}
}

async function getOrCreatePhraseTranslation(
	input: RunFetchForPhraseInput,
): Promise<ReturnType<typeof mapPhraseTranslationToStatus>> {
	const existing = await input.getPhraseTranslation({
		variables: {
			input: {
				sentenceId: input.sentenceId,
				selectedWordStartOffset: input.wordStartOffset,
				selectedWordEndOffset: input.wordEndOffset,
			},
		},
		fetchPolicy: 'network-only',
	})

	const existingPhrase = existing.data?.translate_get_phrase_translation
	if (existingPhrase?.translate) {
		return mapPhraseTranslationToStatus(existingPhrase)
	}

	const selectedWord = input.sentenceText.slice(input.wordStartOffset, input.wordEndOffset)

	const generated = await input.translatePhrase({
		variables: {
			input: {
				sentenceId: input.sentenceId,
				text: input.sentenceText,
				selectedWord,
				selectedWordStartOffset: input.wordStartOffset,
				selectedWordEndOffset: input.wordEndOffset,
				bookName: input.bookName ?? undefined,
				bookAuthor: input.bookAuthor ?? undefined,
				videoName: input.videoName ?? undefined,
				videoYear: toNullableString(input.videoYear) ?? undefined,
			},
		},
	})

	const generatedPhrase = generated.data?.translate_translate_phrase
	if (!generatedPhrase?.translate) {
		throw new Error('Не удалось получить перевод слова')
	}

	return mapPhraseTranslationToStatus(generatedPhrase)
}
