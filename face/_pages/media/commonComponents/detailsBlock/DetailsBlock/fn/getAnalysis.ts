import { useEffect, useRef } from 'react'
import { useSentenceTranslation_GetBySentenceIdLazyQuery } from 'graphql'
import { useDetailsStore } from '../../detailsStore'
import { readTranslationStream } from './translationStream'

export function useGetAnalysis() {
	const sentenceId = useDetailsStore((s) => s.sentenceId)
	const sentenceText = useDetailsStore((s) => s.sentenceText)
	const bookName = useDetailsStore((s) => s.bookName)
	const bookAuthor = useDetailsStore((s) => s.bookAuthor)
	const videoName = useDetailsStore((s) => s.videoName)
	const videoYear = useDetailsStore((s) => s.videoYear)

	const activeRequestIdRef = useRef(0)

	const [fetchTranslations] = useSentenceTranslation_GetBySentenceIdLazyQuery({ fetchPolicy: 'no-cache' })

	useEffect(
		function () {
			if (!sentenceId || !sentenceText) return

			activeRequestIdRef.current += 1
			const requestId = activeRequestIdRef.current
			const isActiveRequestId = () => activeRequestIdRef.current === requestId

			useDetailsStore.getState().updateStore({
				sentenceTranslation: null,
				sentenceAnalysis: null,
				sentenceAnalysisLoading: true,
			})

			fetchTranslations({ variables: { input: { sentenceId } } })
				.then((data) => {
					if (!isActiveRequestId()) return

					const translations = data.data?.sentence_translation_get_by_sentence_id

					if (translations?.length) {
						useDetailsStore.setState({
							sentenceTranslation: translations[0].translation,
							sentenceAnalysis: translations[0].analysis,
							sentenceAnalysisLoading: false,
						})
						return
					}

					void translateSelectedSentence({
						sentenceId,
						sentenceText,
						bookName,
						bookAuthor,
						videoName,
						videoYear,
						isActive: isActiveRequestId,
					})
				})
				.catch((error) => {
					if (!isActiveRequestId()) return

					useDetailsStore
						.getState()
						.updateStore({ sentenceAnalysisLoading: false, sentenceAnalysisError: error.message })
				})

			return () => {
				activeRequestIdRef.current += 1
			}
		},
		[bookAuthor, bookName, fetchTranslations, sentenceId, sentenceText, videoName, videoYear],
	)
}

async function translateSelectedSentence(input: {
	sentenceId: number
	sentenceText: string
	bookName: null | string
	bookAuthor: null | string
	videoName: null | string
	videoYear: null | string | number
	isActive: () => boolean
}) {
	const url = buildTranslateSentenceUrl({
		sentenceId: input.sentenceId,
		text: input.sentenceText,
		bookName: input.bookName,
		bookAuthor: input.bookAuthor,
		videoName: input.videoName,
		videoYear: input.videoYear,
	})

	const result = await readTranslationStream(url, {
		onPartial: (translation, analysis) => {
			if (!input.isActive()) return

			useDetailsStore.setState({
				sentenceTranslation: translation,
				sentenceAnalysis: analysis,
			})
		},
	})

	if (!input.isActive()) return

	if (result.type === 'error') {
		useDetailsStore.setState({
			sentenceAnalysisError: result.message,
			sentenceAnalysisLoading: false,
		})
		return
	}

	if (result.type === 'ok') {
		useDetailsStore.setState({
			sentenceAnalysisLoading: false,
		})
	}
}

function buildTranslateSentenceUrl(input: {
	sentenceId: number
	text: string
	bookName: null | string
	bookAuthor: null | string
	videoName: null | string
	videoYear: null | string | number
}) {
	const url = new URL('/api/translate/sentence/stream', window.location.origin)

	url.searchParams.set('sentenceId', String(input.sentenceId))
	url.searchParams.set('text', input.text)

	if (input.bookName) url.searchParams.set('bookName', input.bookName)
	if (input.bookAuthor) url.searchParams.set('bookAuthor', input.bookAuthor)
	if (input.videoName) url.searchParams.set('videoName', input.videoName)
	if (input.videoYear) url.searchParams.set('videoYear', String(input.videoYear))

	return url.toString()
}
