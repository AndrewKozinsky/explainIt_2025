import { useEffect, useState } from 'react'
import { LanguageCode } from 'utils/languages'
import { useUniversalPhrase_GetLazyQuery, useUniversalPhrase_Create } from '@/graphql'
import { resolvePhrase } from '_pages/media/commonComponents/resolveUniversalPhrase'
import { Status } from './types'

export type PhraseResult = {
	status: Status
	phraseId: number | null
	phraseTranscription: { ipa?: string | null } | null
	phraseAudioUrl: string | null
}

export function usePhrase(phrase: string, languageCode: LanguageCode): PhraseResult {
	const [status, setStatus] = useState<Status>('loading')
	const [phraseId, setPhraseId] = useState<number | null>(null)
	const [phraseTranscription, setPhraseTranscription] = useState<{ ipa?: string | null } | null>(null)
	const [phraseAudioUrl, setPhraseAudioUrl] = useState<string | null>(null)

	const [getPhrase] = useUniversalPhrase_GetLazyQuery()
	const [createPhrase] = useUniversalPhrase_Create()

	useEffect(() => {
		let cancelled = false

		setStatus('loading')
		setPhraseId(null)
		setPhraseTranscription(null)
		setPhraseAudioUrl(null)

		resolvePhrase(phrase, languageCode, getPhrase, createPhrase).then((data) => {
			if (cancelled) return
			if (data) {
				setPhraseId(data.id)
				setPhraseTranscription(data.transcription ?? null)
				setPhraseAudioUrl(data.audioPronunciation?.audioUrl ?? null)
				setStatus('ready')
			} else {
				setStatus('error')
			}
		})

		return () => {
			cancelled = true
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [phrase, languageCode])

	return { status, phraseId, phraseTranscription, phraseAudioUrl }
}
