import React from 'react'
import { useSelectedSentenceStore } from '../../selectedSentenceStore'
import { parseTranslationAndAnalysisSoFar, readTranslationStream } from './translationStream'

export function useTranslateSentence() {
	const sentenceId = useSelectedSentenceStore((s) => s.sentenceId)
	const sentenceText = useSelectedSentenceStore((s) => s.sentenceText)
	const bookName = useSelectedSentenceStore((s) => s.bookName)
	const bookAuthor = useSelectedSentenceStore((s) => s.bookAuthor)
	const videoName = useSelectedSentenceStore((s) => s.videoName)
	const videoYear = useSelectedSentenceStore((s) => s.videoYear)
	const updateStore = useSelectedSentenceStore((s) => s.updateStore)
	const upsertSentenceTranslation = useSelectedSentenceStore((s) => s.upsertSentenceTranslation)

	const [loading, setLoading] = React.useState(false)
	const [errorText, setErrorText] = React.useState<null | string>(null)

	const onTranslateClick = React.useCallback(
		async function onTranslateClick() {
			if (!sentenceId) return
			if (!sentenceText) return

			setLoading(true)
			setErrorText(null)

			const url = buildTranslateSentenceUrl({
				sentenceId,
				text: sentenceText,
				bookName,
				bookAuthor,
				videoName,
				videoYear,
			})
			const result = await readTranslationStream(url, {
				onPartial: (translation, analysis) => {
					updateStore({ translation, analysis })
				},
			})

			if (result.type === 'error') {
				setErrorText(result.message)
				setLoading(false)
				return
			}

			const parsed = parseTranslationAndAnalysisSoFar(result.fullText)

			upsertSentenceTranslation({
				id: 0,
				sentenceId,
				translation: parsed.translation,
				analysis: parsed.analysis,
				createdAt: new Date().toISOString(),
			})

			setLoading(false)
			return
		},
		[bookAuthor, bookName, sentenceId, sentenceText, updateStore, upsertSentenceTranslation, videoName, videoYear],
	)

	return {
		onTranslateClick,
		loading,
		errorText,
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
	if (input.videoYear !== null && input.videoYear !== undefined) {
		url.searchParams.set('videoYear', String(input.videoYear))
	}

	return url.toString()
}
