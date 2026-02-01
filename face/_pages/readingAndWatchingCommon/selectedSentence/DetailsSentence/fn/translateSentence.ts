import React from 'react'
import { useSelectedSentenceStore } from '../../selectedSentenceStore'
import { parseTranslationAndAnalysisSoFar, readTranslationStream } from './translationStream'

export function useTranslateSentence() {
	const sentenceId = useSelectedSentenceStore((s) => s.sentenceId)
	const sentenceText = useSelectedSentenceStore((s) => s.sentenceText)
	const updateStore = useSelectedSentenceStore((s) => s.updateStore)
	const upsertSentenceTranslation = useSelectedSentenceStore((s) => s.upsertSentenceTranslation)

	const [loading, setLoading] = React.useState(false)
	const [errorText, setErrorText] = React.useState<null | string>(null)

	async function onTranslateClick() {
		setLoading(true)
		setErrorText(null)

		const url = buildTranslateSentenceUrl({
			sentenceId,
			text: sentenceText,
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
	}

	return {
		onTranslateClick,
		loading,
		errorText,
	}
}

function buildTranslateSentenceUrl(input: { sentenceId: number; text: string }) {
	const url = new URL('/api/translate/sentence/stream', window.location.origin)

	url.searchParams.set('sentenceId', String(input.sentenceId))
	url.searchParams.set('text', input.text)

	return url.toString()
}
