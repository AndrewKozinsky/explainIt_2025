import { useEffect, useMemo, useRef } from 'react'
import {
	SentencePhraseTranslationOutModel,
	useTranslate_Get_Phrase_TranslationLazyQuery,
	useTranslate_Get_Sentence_TranslationLazyQuery,
	useTranslate_Translate_Phrase,
	useTranslate_Translate_Sentence,
} from '@/graphql'
import { useDetailsStore } from '../../detailsStore'

export function useGetAnalysis() {
	const sentenceId = useDetailsStore((s) => s.sentenceId)
	const sentenceText = useDetailsStore((s) => s.sentenceText)
	const wordIds = useDetailsStore((s) => s.wordIds)
	const bookName = useDetailsStore((s) => s.bookName)
	const bookAuthor = useDetailsStore((s) => s.bookAuthor)
	const videoName = useDetailsStore((s) => s.videoName)
	const videoYear = useDetailsStore((s) => s.videoYear)

	const [getSentenceTranslation] = useTranslate_Get_Sentence_TranslationLazyQuery()
	const [getPhraseTranslation] = useTranslate_Get_Phrase_TranslationLazyQuery()
	const [translateSentence] = useTranslate_Translate_Sentence()
	const [translatePhrase] = useTranslate_Translate_Phrase()

	const activeRequestIdRef = useRef(0)
	const prevSentenceIdRef = useRef<null | number>(null)
	const prevWordIdRef = useRef<null | number>(null)

	const selectedWord = useMemo(
		function () {
			return getSelectedWordWithOffsetsFromSentence({
				sentenceText,
				wordIds,
			})
		},
		[sentenceText, wordIds],
	)

	useEffect(
		function () {
			if (!sentenceId || !sentenceText) return

			const selectedWordId = wordIds[0] ?? null
			const sentenceChanged = prevSentenceIdRef.current !== sentenceId
			const wordChanged = prevWordIdRef.current !== selectedWordId

			if (!sentenceChanged && !wordChanged) {
				return
			}

			prevSentenceIdRef.current = sentenceId
			prevWordIdRef.current = selectedWordId

			activeRequestIdRef.current += 1
			const requestId = activeRequestIdRef.current
			const isActiveRequestId = () => activeRequestIdRef.current === requestId

			if (sentenceChanged) {
				useDetailsStore.getState().updateStore({
					sentenceTranslation: null,
					sentenceAnalysis: null,
					wordAnalysis: null,
					isLoading: true,
					error: null,
				})
			} else {
				useDetailsStore.getState().updateStore({
					wordAnalysis: null,
					isLoading: true,
					error: null,
				})
			}

			void (async () => {
				try {
					if (sentenceChanged) {
						const [nextSentenceTranslation, nextWordAnalysis] = await Promise.all([
							getOrCreateSentenceTranslation({
								sentenceId,
								sentenceText,
								bookName,
								bookAuthor,
								videoName,
								videoYear,
								getSentenceTranslation,
								translateSentence,
							}),
							getOrCreateWordAnalysis({
								sentenceId,
								sentenceText,
								selectedWord,
								bookName,
								bookAuthor,
								videoName,
								videoYear,
								getPhraseTranslation,
								translatePhrase,
							}),
						])

						if (!isActiveRequestId()) return

						useDetailsStore.getState().updateStore({
							sentenceTranslation: nextSentenceTranslation,
							sentenceAnalysis: null,
							wordAnalysis: nextWordAnalysis,
							isLoading: false,
							error: null,
						})
						return
					}

					const nextWordAnalysis = await getOrCreateWordAnalysis({
						sentenceId,
						sentenceText,
						selectedWord,
						bookName,
						bookAuthor,
						videoName,
						videoYear,
						getPhraseTranslation,
						translatePhrase,
					})

					if (!isActiveRequestId()) return

					useDetailsStore.getState().updateStore({
						wordAnalysis: nextWordAnalysis,
						isLoading: false,
						error: null,
					})
				} catch (error) {
					if (!isActiveRequestId()) return

					useDetailsStore.getState().updateStore({
						isLoading: false,
						error: error instanceof Error ? error.message : 'Unknown error',
					})
				}
			})()

			return () => {
				activeRequestIdRef.current += 1
			}
		},
		[
			sentenceId,
			sentenceText,
			wordIds,
			selectedWord,
			bookName,
			bookAuthor,
			videoName,
			videoYear,
			getSentenceTranslation,
			getPhraseTranslation,
			translateSentence,
			translatePhrase,
		],
	)
}

type GetOrCreateSentenceTranslationInput = {
	sentenceId: number
	sentenceText: string
	bookName: null | string
	bookAuthor: null | string
	videoName: null | string
	videoYear: null | string | number
    getSentenceTranslation: ReturnType<typeof useTranslate_Get_Sentence_TranslationLazyQuery>[0]
    translateSentence: ReturnType<typeof useTranslate_Translate_Sentence>[0]
}

async function getOrCreateSentenceTranslation(input: GetOrCreateSentenceTranslationInput): Promise<string> {
	const existing = await input.getSentenceTranslation({
		variables: {
			input: {
				sentenceId: input.sentenceId,
			},
		},
		fetchPolicy: 'network-only',
	})

	const existingTranslation = existing.data?.translate_get_sentence_translation?.translation
	if (existingTranslation) {
		return existingTranslation
	}

	const generated = await input.translateSentence({
		variables: {
			input: {
				sentenceId: input.sentenceId,
				text: input.sentenceText,
				bookName: input.bookName ?? undefined,
				bookAuthor: input.bookAuthor ?? undefined,
				videoName: input.videoName ?? undefined,
				videoYear: toNullableString(input.videoYear) ?? undefined,
			},
		},
	})

	const generatedTranslation = generated.data?.translate_translate_sentence?.translation
	if (!generatedTranslation) {
		throw new Error('Не удалось получить перевод предложения')
	}

	return generatedTranslation
}

type GetOrCreateWordAnalysisInput = {
	sentenceId: number
	sentenceText: string
	selectedWord: null | { word: string; startOffset: number; endOffset: number }
	bookName: null | string
	bookAuthor: null | string
	videoName: null | string
	videoYear: null | string | number
    getPhraseTranslation: ReturnType<typeof useTranslate_Get_Phrase_TranslationLazyQuery>[0]
    translatePhrase: ReturnType<typeof useTranslate_Translate_Phrase>[0]
}

async function getOrCreateWordAnalysis(input: GetOrCreateWordAnalysisInput): Promise<null | string> {
	if (!input.selectedWord) {
		return null
	}

	const existing = await input.getPhraseTranslation({
		variables: {
			input: {
				sentenceId: input.sentenceId,
				selectedWordStartOffset: input.selectedWord.startOffset,
				selectedWordEndOffset: input.selectedWord.endOffset,
			},
		},
		fetchPolicy: 'network-only',
	})

	const existingPhrase = existing.data?.translate_get_phrase_translation
	if (existingPhrase?.translate) {
		return buildWordAnalysisFromPhraseTranslation(existingPhrase)
	}

	const generated = await input.translatePhrase({
		variables: {
			input: {
				sentenceId: input.sentenceId,
				text: input.sentenceText,
				selectedWord: input.selectedWord.word,
				selectedWordStartOffset: input.selectedWord.startOffset,
				selectedWordEndOffset: input.selectedWord.endOffset,
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

	return buildWordAnalysisFromPhraseTranslation(generatedPhrase)
}

function buildWordAnalysisFromPhraseTranslation(phraseTranslation: SentencePhraseTranslationOutModel): string {
	const lines = [`* **${phraseTranslation.phrase}** — ${phraseTranslation.translate ?? ''}`]

	for (const example of phraseTranslation.examples ?? []) {
		if (!example.text || !example.translate) {
			continue
		}

		lines.push(`* ${example.text} — ${example.translate}`)
	}

	return lines.join('\n')
}

function toNullableString(value: null | string | number): null | string {
	if (value === null || value === undefined) {
		return null
	}

	return String(value)
}

function getSelectedWordWithOffsetsFromSentence(input: {
	sentenceText: null | string
	wordIds: number[]
	locale?: string
}): null | { word: string; startOffset: number; endOffset: number } {
	const { sentenceText, wordIds, locale } = input

	const wordId = wordIds[0]
	if (!wordId || !sentenceText) return null

	const segmenter = new Intl.Segmenter(locale, { granularity: 'word' })
	const segments = [...segmenter.segment(sentenceText)].filter((segment) => segment.isWordLike)
	const selectedSegment = segments[wordId - 1]

	if (!selectedSegment?.segment) {
		return null
	}

	const startOffset = selectedSegment.index
	const endOffset = selectedSegment.index + selectedSegment.segment.length

	return {
		word: selectedSegment.segment,
		startOffset,
		endOffset,
	}
}
