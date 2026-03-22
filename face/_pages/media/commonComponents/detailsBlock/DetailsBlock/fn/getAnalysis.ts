import { useEffect, useMemo, useRef } from 'react'
import { useDetailsStore } from '../../detailsStore'
import { getSelectedWordFromSentence } from './getSelectedWordFromSentence'
import { getWordAnalysisFromSentenceAnalysis } from './getWordAnalysisFromSentenceAnalysis'
import { readTranslationStream } from './translationStream'

export function useGetAnalysis() {
	const sentenceId = useDetailsStore((s) => s.sentenceId)
	const sentenceText = useDetailsStore((s) => s.sentenceText)
	const wordIds = useDetailsStore((s) => s.wordIds)
	const sentenceAnalysis = useDetailsStore((s) => s.sentenceAnalysis)
	const bookName = useDetailsStore((s) => s.bookName)
	const bookAuthor = useDetailsStore((s) => s.bookAuthor)
	const videoName = useDetailsStore((s) => s.videoName)
	const videoYear = useDetailsStore((s) => s.videoYear)

	const activeRequestIdRef = useRef(0)

	const selectedWord = useMemo(
		function () {
			return getSelectedWordFromSentence({
				sentenceText,
				wordIds,
			})
		},
		[sentenceText, wordIds],
	)

	useEffect(
		function () {
			const wordAnalysis = getWordAnalysisFromSentenceAnalysis({
				analysis: sentenceAnalysis,
				selectedWord,
			})

			useDetailsStore.setState({ wordAnalysis })
		},
		[selectedWord, sentenceAnalysis],
	)

	useEffect(
		function () {
			if (!sentenceId || !sentenceText) return

			activeRequestIdRef.current += 1
			const requestId = activeRequestIdRef.current
			const isActiveRequestId = () => activeRequestIdRef.current === requestId

			useDetailsStore.getState().updateStore({
				sentenceTranslation: null,
				sentenceAnalysis: null,
				wordAnalysis: null,
				isLoading: true,
				error: null,
			})

			void translateSelectedSentence({
				sentenceId,
				sentenceText,
				bookName,
				bookAuthor,
				videoName,
				videoYear,
				selectedWord,
				isActive: isActiveRequestId,
			}).catch((error) => {
				if (!isActiveRequestId()) return

				useDetailsStore.getState().updateStore({ isLoading: false, error: error.message })
			})

			return () => {
				activeRequestIdRef.current += 1
			}
		},
		[sentenceId],
	)
}

async function translateSelectedSentence(input: {
	sentenceId: number
	sentenceText: string
	bookName: null | string
	bookAuthor: null | string
	videoName: null | string
	videoYear: null | string | number
	selectedWord: null | string
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

			const wordAnalysis = getWordAnalysisFromSentenceAnalysis({
				analysis,
				selectedWord: input.selectedWord,
			})

			useDetailsStore.setState({
				sentenceTranslation: translation,
				sentenceAnalysis: analysis,
				wordAnalysis,
			})
		},
	})

	if (!input.isActive()) return

	if (result.type === 'error') {
		useDetailsStore.setState({
			error: result.message,
			isLoading: false,
		})
		return
	}

	if (result.type === 'ok') {
		useDetailsStore.setState({
			isLoading: false,
			error: null,
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
