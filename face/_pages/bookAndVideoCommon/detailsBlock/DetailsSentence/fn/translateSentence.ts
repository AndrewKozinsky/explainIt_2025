import React, { useEffect } from 'react'
import { useDetailsStore } from '../../detailsStore'
import { readTranslationStream } from './translationStream'

export function useTranslateSentence() {
	const sentenceId = useDetailsStore((s) => s.sentenceId)
	const sentenceText = useDetailsStore((s) => s.sentenceText)
	const bookName = useDetailsStore((s) => s.bookName)
	const bookAuthor = useDetailsStore((s) => s.bookAuthor)
	const videoName = useDetailsStore((s) => s.videoName)
	const videoYear = useDetailsStore((s) => s.videoYear)
	const isPublicMedia = useDetailsStore((s) => s.isPublicMedia)
	const sentenceAnalysisReqType = useDetailsStore((s) => s.sentenceAnalysisReqType)

	const lastAutoTranslateSentenceIdRef = React.useRef<null | number>(null)

	useEffect(
		function () {
			if (!sentenceId || !sentenceText) return
			if (sentenceAnalysisReqType !== 'TRANSLATE') return
			if (lastAutoTranslateSentenceIdRef.current === sentenceId) return

			lastAutoTranslateSentenceIdRef.current = sentenceId
			void translateSelectedSentence({
				sentenceId,
				sentenceText,
				isPublicMedia,
				bookName,
				bookAuthor,
				videoName,
				videoYear,
			})
		},
		[bookAuthor, bookName, isPublicMedia, sentenceAnalysisReqType, sentenceId, sentenceText, videoName, videoYear],
	)
}

async function translateSelectedSentence(input: {
	sentenceId: number
	sentenceText: string
	isPublicMedia: boolean
	bookName: null | string
	bookAuthor: null | string
	videoName: null | string
	videoYear: null | string | number
}) {
	const url = buildTranslateSentenceUrl({
		sentenceId: input.sentenceId,
		text: input.sentenceText,
		isPublicMedia: input.isPublicMedia,
		bookName: input.bookName,
		bookAuthor: input.bookAuthor,
		videoName: input.videoName,
		videoYear: input.videoYear,
	})

	const result = await readTranslationStream(url, {
		onPartial: (translation, analysis) => {
			useDetailsStore.setState({
				sentenceAnalysisLoading: false,
				sentenceAnalysisReqType: 'FIND_EXISTING',
				sentenceTranslation: translation,
				sentenceAnalysis: analysis,
			})
		},
	})

	if (result.type === 'error') {
		useDetailsStore.setState({ sentenceAnalysisError: result.message, sentenceAnalysisLoading: false })
		return
	}
}

function buildTranslateSentenceUrl(input: {
	sentenceId: number
	text: string
	isPublicMedia: boolean
	bookName: null | string
	bookAuthor: null | string
	videoName: null | string
	videoYear: null | string | number
}) {
	const url = new URL('/api/translate/sentence/stream', window.location.origin)

	url.searchParams.set('sentenceId', String(input.sentenceId))
	url.searchParams.set('text', input.text)
	url.searchParams.set('isPublicMedia', String(input.isPublicMedia))

	if (input.bookName) url.searchParams.set('bookName', input.bookName)
	if (input.bookAuthor) url.searchParams.set('bookAuthor', input.bookAuthor)
	if (input.videoName) url.searchParams.set('videoName', input.videoName)
	if (input.videoYear) url.searchParams.set('videoYear', String(input.videoYear))

	return url.toString()
}
