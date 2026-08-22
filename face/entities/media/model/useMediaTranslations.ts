import { useEffect } from 'react'
import { useLocale } from 'next-intl'
import type { StoreApi, UseBoundStore } from 'zustand'
import { translateService } from '@/entities/translate/TranslateService'
import type { PhraseTranslationModel } from '@/entities/translate/TranslateService'
import type { BaseMediaStore } from '../store/createBaseMediaStore'
import type { SentenceModel } from '@/entities/media/repository/SentenceTypes'
import type { LanguageCode } from '@/shared/utils/languages'
import type { SentencePhraseType } from '../store/translationTypes'
import { offsetsFromWordIds, wordIdsFromOffsets } from '@/entities/detailsBlock/DetailsBlock/fn/wordSegmentation'

type MediaTranslationContext = {
	bookName?: null | string
	bookAuthor?: null | string
	videoName?: null | string
	languageCode?: null | LanguageCode
	sentences?: SentenceModel[] | null
	selectedSentenceId: null | number
	selectedWordId: null | number
	mediaStore: UseBoundStore<StoreApi<BaseMediaStore>>
}

/** Координирует загрузку переводов для всех потребителей текущего media-контекста. */
export function useMediaTranslations(input: MediaTranslationContext): void {
	const locale = useLocale()
	const { mediaStore, sentences, languageCode, selectedSentenceId, selectedWordId } = input

	useEffect(() => {
		mediaStore.getState().setTranslationContext({ languageCode: languageCode ?? null, sentences: sentences ?? [] })
	}, [mediaStore, languageCode, sentences])

	useEffect(() => () => mediaStore.getState().clearMediaData(), [mediaStore])

	useEffect(() => {
		if (selectedSentenceId === null) return

		const state = mediaStore.getState()
		const entry = state.sentences.find((item) => item.sentenceId === selectedSentenceId)

		if (!entry || entry.data.translation.translation || entry.data.translation.loading) return
		void fetchSentence({
			...input,
			sentenceId: selectedSentenceId,
			sentenceText: entry.sentenceText,
			targetLanguageCode: locale,
		})
	}, [mediaStore, selectedSentenceId, locale])

	useEffect(() => {
		if (selectedSentenceId === null || selectedWordId === null) return
		const state = mediaStore.getState()
		const entry = state.sentences.find((item) => item.sentenceId === selectedSentenceId)
		if (!entry) return

		const existing = entry.data.phrases.find((phrase) => phrase.wordIds.includes(selectedWordId))
		if (existing)
			return state.setSelectedPhraseId({
				sentenceId: selectedSentenceId,
				phraseId: existing.randomGeneratedPhraseId,
			})

		const offsets = offsetsFromWordIds({
			sentenceText: entry.sentenceText,
			locale: state.languageCode,
			wordIds: [selectedWordId],
		})
		if (!offsets) return

		const phraseId = makePhraseId()

		state.upsertPhraseTranslation({
			sentenceId: selectedSentenceId,
			phrase: {
				randomGeneratedPhraseId: phraseId,
				sentencePhraseId: null,
				flashcardId: null,
				wordIds: [selectedWordId],
				phrase: offsets.text || null,
				loading: true,
				error: null,
				translation: null,
				examples: [],
			},
		})

		state.setSelectedPhraseId({ sentenceId: selectedSentenceId, phraseId })

		void fetchPhrase({
			...input,
			sentenceId: selectedSentenceId,
			sentenceText: entry.sentenceText,
			phraseId,
			wordStartOffset: offsets.startOffset,
			wordEndOffset: offsets.endOffset,
			targetLanguageCode: locale,
		})
	}, [mediaStore, selectedSentenceId, selectedWordId, locale])

	const sentenceRetries = mediaStore((state) => state.retryFetchSentenceTranslationQueue)

	useEffect(() => {
		if (!sentenceRetries.length) return
		mediaStore.setState({ retryFetchSentenceTranslationQueue: [] })

		for (const item of sentenceRetries)
			void fetchSentence({
				...input,
				sentenceId: item.sentenceId,
				sentenceText: item.sentenceText,
				targetLanguageCode: locale,
			})
	}, [mediaStore, sentenceRetries, locale])

	const phraseRetries = mediaStore((state) => state.retryFetchPhraseQueue)

	useEffect(() => {
		if (!phraseRetries.length) return

		mediaStore.setState({ retryFetchPhraseQueue: [] })
		const state = mediaStore.getState()

		for (const item of phraseRetries) {
			const offsets = offsetsFromWordIds({
				sentenceText: item.sentenceText,
				locale: state.languageCode,
				wordIds: item.wordIds,
			})

			if (offsets)
				void fetchPhrase({
					...input,
					sentenceId: item.sentenceId,
					sentenceText: item.sentenceText,
					phraseId: item.randomGeneratedPhraseId,
					wordStartOffset: offsets.startOffset,
					wordEndOffset: offsets.endOffset,
					targetLanguageCode: locale,
				})
		}
	}, [mediaStore, phraseRetries, locale])
}

async function fetchSentence(
	input: MediaTranslationContext & { sentenceId: number; sentenceText: string; targetLanguageCode: string },
) {
	input.mediaStore.getState().patchSentenceTranslation({
		sentenceId: input.sentenceId,
		patch: { loading: true, error: null, visible: true },
	})

	try {
		const result = await translateService.translateSentence({
			sentenceId: input.sentenceId,
			targetLanguageCode: input.targetLanguageCode,
			bookName: input.bookName,
			bookAuthor: input.bookAuthor,
			videoName: input.videoName,
		})

		if (result.error || !result.data.translation) throw new Error()

		input.mediaStore.getState().patchSentenceTranslation({
			sentenceId: input.sentenceId,
			patch: {
				text: result.data.translation,
				translation: result.data.translation,
				loading: false,
				error: null,
			},
		})

		const cached = await translateService.getPhraseTranslationsBySentence({
			sentenceId: input.sentenceId,
			targetLanguageCode: input.targetLanguageCode,
		})

		if (!cached.error)
			for (const phrase of cached.data) {
				input.mediaStore.getState().upsertPhraseTranslation({
					sentenceId: input.sentenceId,
					phrase: mapPhrase(phrase, input.sentenceText, input.languageCode ?? null),
				})
			}
	} catch {
		input.mediaStore.getState().patchSentenceTranslation({
			sentenceId: input.sentenceId,
			patch: { loading: false, error: 'Не удалось получить перевод предложения' },
		})
	}
}

async function fetchPhrase(
	input: MediaTranslationContext & {
		sentenceId: number
		sentenceText: string
		phraseId: string
		wordStartOffset: number
		wordEndOffset: number
		targetLanguageCode: string
	},
) {
	try {
		const cached = await translateService.getPhraseTranslation({
			sentenceId: input.sentenceId,
			targetLanguageCode: input.targetLanguageCode,
			selectedWordStartOffset: input.wordStartOffset,
			selectedWordEndOffset: input.wordEndOffset,
		})

		let phrase = cached.data
		if (!phrase?.translation) {
			const generated = await translateService.translatePhrase({
				sentenceId: input.sentenceId,
				text: input.sentenceText,
				selectedWord: input.sentenceText.slice(input.wordStartOffset, input.wordEndOffset),
				targetLanguageCode: input.targetLanguageCode,
				selectedWordStartOffset: input.wordStartOffset,
				selectedWordEndOffset: input.wordEndOffset,
				bookName: input.bookName,
				bookAuthor: input.bookAuthor,
				videoName: input.videoName,
			})

			if (generated.error || !generated.data.translation) throw new Error()
			phrase = generated.data
		}
		input.mediaStore.getState().finalizePhraseTranslation({
			sentenceId: input.sentenceId,
			placeholderPhraseId: input.phraseId,
			phrase: mapPhrase(phrase, input.sentenceText, input.languageCode ?? null),
		})
	} catch {
		input.mediaStore.getState().patchPhraseTranslation({
			sentenceId: input.sentenceId,
			phraseId: input.phraseId,
			patch: { loading: false, error: 'Не удалось получить перевод слова' },
		})
	}
}

function mapPhrase(
	phrase: PhraseTranslationModel,
	sentenceText: string,
	languageCode: null | string,
): SentencePhraseType {
	return {
		randomGeneratedPhraseId: makePhraseId(),
		sentencePhraseId: phrase.id,
		flashcardId: phrase.flashcardId,
		wordIds: wordIdsFromOffsets({
			sentenceText,
			locale: languageCode,
			startOffset: phrase.phraseStartOffset,
			endOffset: phrase.phraseEndOffset,
		}),
		phrase: phrase.phrase,
		loading: false,
		error: null,
		translation: phrase.translation,
		examples: phrase.examples.map((example) => ({ text: example.text ?? '', translate: example.translate ?? '' })),
	}
}

function makePhraseId(): string {
	return `p_${Math.random().toString(36).slice(2)}_${Date.now().toString(36)}`
}
