import { useEffect } from 'react'
import { useBookChapter_Get, useVideoPrivate_Get, useVideoPublic_Get } from '@/graphql'
import { useReadingStore } from '_pages/media/reading/readingStore'
import { useWatchingStore } from '_pages/media/watching/watchingStore'
import { useDetailsStore, DetailsSentenceEntry, SentencePhrase, makePhraseId } from '../../detailsStore'

export function usePopulateStore() {
	useFetchChapterAndSetToStore()
	useFetchVideoAndSetToStore()
}

function useFetchChapterAndSetToStore() {
	const chapterId = useDetailsStore((s) => s.chapterId)
	const bookType = useReadingStore((s) => s.book?.type)

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

			const sentences = mapToDetailsSentenceEntries({
				sentences: chapter.sentences ?? [],
				getTranslation: (s) => s.sentenceTranslation?.translation ?? null,
			})

			useDetailsStore.getState().updateStore({ sentences })
		},
		[data],
	)
}

function useFetchVideoAndSetToStore() {
	const videoId = useDetailsStore((s) => s.videoId)
	const videoType = useWatchingStore((s) => s.video?.type)

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

			const sentences = mapToDetailsSentenceEntries({
				sentences: video.sentences ?? [],
				getTranslation: (s) => s.sentenceTranslations?.[0]?.translation ?? null,
			})

			useDetailsStore.getState().updateStore({ sentences })
		},
		[videoType, privateVideoData, publicVideoData],
	)
}

type ServerSentence = {
	id: number
	sentenceTranslation?: { translation: string } | null
	sentenceTranslations?: Array<{ translation: string }> | null
	sentencePhraseTranslations?: Array<{
		id: number
		phrase: string
		translate?: string | null
		status: string
		errorMessage?: string | null
		flashcardId?: number | null
		examples: Array<{ text: string; translate: string }>
	}> | null
}

function mapToDetailsSentenceEntries(input: {
	sentences: ServerSentence[]
	getTranslation: (sentence: ServerSentence) => null | string
}): DetailsSentenceEntry[] {
	const { sentences, getTranslation } = input

	return sentences
		.filter((s) => getTranslation(s) !== null)
		.map((sentence) => {
			const translation = getTranslation(sentence)!

			return {
				sentenceId: sentence.id,
				selectedPhraseId: null,
				data: {
					translation: {
						text: translation,
						loading: false,
						error: null,
						translation,
					},
					phrases: mapSentencePhrases(sentence.sentencePhraseTranslations ?? []),
				},
			}
		})
}

function mapSentencePhrases(
	phraseTranslations: NonNullable<ServerSentence['sentencePhraseTranslations']>,
): SentencePhrase[] {
	return phraseTranslations.map((pt) => ({
		randomGeneratedPhraseId: makePhraseId(),
		sentencePhraseId: pt.id,
		flashcardId: pt.flashcardId ?? null,
		wordIds: [],
		phrase: pt.phrase,
		loading: false,
		error: pt.status === 'error' ? (pt.errorMessage ?? 'Unknown error') : null,
		translation: pt.translate ?? null,
		examples: pt.examples ?? [],
	}))
}
