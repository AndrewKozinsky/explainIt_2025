import { useEffect } from 'react'
import { LanguageCode } from 'utils/languages'
import { useBookChapter_Get, useVideoPrivate_Get, useVideoPublic_Get } from '@/graphql'
import { usePhraseStore, PreloadItem } from '@/stores/phraseStore'
import { useReadingStore } from '_pages/media/reading/readingStore'
import { useWatchingStore } from '_pages/media/watching/watchingStore'
import { useDetailsStore, DetailsSentenceEntry, SentencePhraseType, makePhraseId } from '../../detailsStore'
import { wordIdsFromOffsets } from './wordSegmentation'

export function usePopulateStore() {
	useFetchChapterAndSetToStore()
	useFetchVideoAndSetToStore()
}

function useFetchChapterAndSetToStore() {
	const chapterId = useDetailsStore((s) => s.chapterId)
	const bookType = useReadingStore((s) => s.book?.type)
	const languageCode = useDetailsStore((s) => s.languageCode)

	const { data } = useBookChapter_Get({
		variables: {
			input: {
				id: chapterId!,
				bookType: bookType || 'private',
				targetLanguageCode: 'ru',
			},
		},
		skip: !chapterId,
	})

	useEffect(
		function () {
			if (!data) return

			const chapter = data.book_chapter_get
			const rawSentences = (chapter.sentences ?? []) as ServerSentence[]

			const sentences = mapToDetailsSentenceEntries({
				originalContent: chapter.originalContent ?? '',
				sentences: rawSentences,
				languageCode,
				getTranslation: (s) => s.sentenceTranslation?.translation ?? null,
			})

			const preloadItems = extractPreloadItems(rawSentences, languageCode as LanguageCode)
			usePhraseStore.getState().preload(preloadItems)

			useDetailsStore.getState().updateStore({ sentences })
		},
		[data, languageCode],
	)
}

function useFetchVideoAndSetToStore() {
	const videoId = useDetailsStore((s) => s.videoId)
	const videoType = useWatchingStore((s) => s.video?.type)
	const languageCode = useDetailsStore((s) => s.languageCode)

	const { data: privateVideoData } = useVideoPrivate_Get({
		variables: { input: { id: videoId! } },
		skip: videoType !== 'private' || !videoId,
	})

	const { data: publicVideoData } = useVideoPublic_Get({
		variables: { input: { id: videoId! } },
		skip: videoType !== 'public' || !videoId,
	})

	useEffect(
		function () {
			const video =
				videoType === 'private' ? privateVideoData?.video_private_get : publicVideoData?.video_public_get

			if (!video) return

			const rawSentences = (video.sentences ?? []) as ServerSentence[]

			const sentences = mapToDetailsSentenceEntries({
				originalContent: video.originalContent ?? '',
				sentences: rawSentences,
				languageCode,
				getTranslation: (s) => s.sentenceTranslations?.[0]?.translation ?? null,
			})

			const preloadItems = extractPreloadItems(rawSentences, languageCode as LanguageCode)
			usePhraseStore.getState().preload(preloadItems)

			useDetailsStore.getState().updateStore({ sentences })
		},
		[videoType, privateVideoData, publicVideoData, languageCode],
	)
}

type ServerSentence = {
	id: number
	startOffset: number
	length: number
	sentenceTranslation?: { translation: string } | null
	sentenceTranslations?: Array<{ translation: string }> | null
	sentencePhraseTranslations?: Array<{
		id: number
		phrase: string
		phraseStartOffset: number
		phraseEndOffset: number
		translate?: string | null
		status: string
		errorMessage?: string | null
		flashcardId?: number | null
		examples: Array<{ text: string; translate: string }>
		universalPhrase?: {
			transcription?: { ipa?: string | null; pinyin?: string | null } | null
			audioPronunciation?: { audioUrl: string } | null
		} | null
	}> | null
}

function mapToDetailsSentenceEntries(input: {
	originalContent: string
	sentences: ServerSentence[]
	languageCode: null | string
	getTranslation: (sentence: ServerSentence) => null | string
}): DetailsSentenceEntry[] {
	const { originalContent, sentences, languageCode, getTranslation } = input

	return sentences
		.filter((s) => getTranslation(s) !== null)
		.map((sentence) => {
			const translation = getTranslation(sentence)!
			const sentenceText = originalContent.slice(
				Math.max(0, sentence.startOffset),
				Math.max(0, sentence.startOffset) + Math.max(0, sentence.length),
			)

			return {
				sentenceId: sentence.id,
				sentenceText,
				selectedPhraseId: null,
				data: {
					translation: {
						text: translation,
						loading: false,
						error: null,
						translation,
						visible: false,
					},
					phrases: mapSentencePhrases({
						phraseTranslations: sentence.sentencePhraseTranslations ?? [],
						sentenceText,
						languageCode,
					}),
				},
			}
		})
}

function mapSentencePhrases(input: {
	phraseTranslations: NonNullable<ServerSentence['sentencePhraseTranslations']>
	sentenceText: string
	languageCode: null | string
}): SentencePhraseType[] {
	const { phraseTranslations, sentenceText, languageCode } = input

	return phraseTranslations.map((pt) => ({
		randomGeneratedPhraseId: makePhraseId(),
		sentencePhraseId: pt.id,
		flashcardId: pt.flashcardId ?? null,
		wordIds: wordIdsFromOffsets({
			sentenceText,
			locale: languageCode,
			startOffset: pt.phraseStartOffset,
			endOffset: pt.phraseEndOffset,
		}),
		phrase: pt.phrase,
		loading: false,
		error: pt.status === 'error' ? (pt.errorMessage ?? 'Unknown error') : null,
		translation: pt.translate ?? null,
		examples: pt.examples ?? [],
	}))
}

function extractPreloadItems(sentences: ServerSentence[], languageCode: LanguageCode): PreloadItem[] {
	const seen = new Set<string>()
	const result: PreloadItem[] = []

	for (const sentence of sentences) {
		for (const pt of sentence.sentencePhraseTranslations ?? []) {
			if (!pt.phrase || seen.has(pt.phrase)) continue

			const up = pt.universalPhrase
			const ipa = up?.transcription?.ipa
			const audioUrl = up?.audioPronunciation?.audioUrl ?? null

			if (ipa || audioUrl) {
				seen.add(pt.phrase)
				result.push({
					phrase: pt.phrase,
					languageCode,
					transcription: ipa ?? undefined,
					audioUrl,
				})
			}
		}
	}

	return result
}
