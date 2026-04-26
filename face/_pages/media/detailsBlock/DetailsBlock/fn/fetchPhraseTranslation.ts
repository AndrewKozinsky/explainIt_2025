import { useEffect } from 'react'
import { useTranslate_Get_Phrase_TranslationLazyQuery, useTranslate_Translate_Phrase } from '@/graphql'
import { makePhraseId, PhraseTranslationStatus, useDetailsStore } from '_pages/media/detailsBlock/detailsStore'
import { mapPhraseTranslationToStatus, toNullableString } from './fetchSentenceTranslation'
import { getSelectedWordOffsets } from './populateStore'
import { findSentenceEntry } from './selectors'

export function useFetchCurrentPhraseTranslation() {
	const currentSentenceId = useDetailsStore((s) => s.currentSentenceId)
	const currentSentenceText = useDetailsStore((s) => s.currentSentenceText)
	const currentWordId = useDetailsStore((s) => s.currentWordId)

	const [getPhraseTranslation] = useTranslate_Get_Phrase_TranslationLazyQuery()
	const [translatePhrase] = useTranslate_Translate_Phrase()

	useEffect(
		function () {
			if (currentSentenceId === null || currentSentenceText === null || currentWordId === null) return

			const offsets = getSelectedWordOffsets({
				sentenceText: currentSentenceText,
				wordId: currentWordId,
			})
			if (!offsets) return

			const state = useDetailsStore.getState()

			const entry = findSentenceEntry({
				sentences: state.sentences,
				sentenceId: currentSentenceId,
			})
			if (!entry) return

			const covering = entry.data.phrases
				.filter(
					(p) => p.startOffset <= offsets.startOffset && p.endOffset >= offsets.endOffset,
				)
				.sort((a, b) => a.endOffset - a.startOffset - (b.endOffset - b.startOffset))[0]

			if (covering) {
				state.setSelectedPhraseId({
					sentenceId: currentSentenceId,
					phraseId: covering.id,
				})
				return
			}

			const phraseId = makePhraseId()

			state.upsertPhraseTranslation({
				sentenceId: currentSentenceId,
				phrase: {
					id: phraseId,
					startOffset: offsets.startOffset,
					endOffset: offsets.endOffset,
					phrase: offsets.word || null,
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
				wordStartOffset: offsets.startOffset,
				wordEndOffset: offsets.endOffset,
				bookName: state.bookName,
				bookAuthor: state.bookAuthor,
				videoName: state.videoName,
				videoYear: state.videoYear,
				getPhraseTranslation,
				translatePhrase,
			})
		},
		[currentSentenceId, currentSentenceText, currentWordId],
	)
}

type RunFetchForPhraseInput = {
	sentenceId: number
	sentenceText: string
	phraseId: string
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
	try {
		const phrase = await getOrCreatePhraseTranslation(input)

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
				error: error instanceof Error ? error.message : 'Unknown error',
			},
		})
	}
}

async function getOrCreatePhraseTranslation(
	input: RunFetchForPhraseInput,
): Promise<PhraseTranslationStatus> {
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
