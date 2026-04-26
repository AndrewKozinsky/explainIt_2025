import { useCallback, useEffect, useState } from 'react'
import { useAudioPronunciation_Create, AudioPronunciation_CreateHookResult } from '@/graphql'
import { AudioData } from './types'

type UseAudioInput = {
	phraseId: number | null
	phraseAudioUrl: string | null
}

type CreateAudioFn = AudioPronunciation_CreateHookResult[0]

export function useAudio({ phraseId, phraseAudioUrl }: UseAudioInput) {
	const [audio, setAudio] = useState<AudioData>({ status: 'idle' })
	const [createAudioPronunciation] = useAudioPronunciation_Create()

	useEffect(() => {
		if (phraseId === null) return

		setAudio(phraseAudioUrl ? { status: 'ready', url: phraseAudioUrl } : { status: 'idle' })
	}, [phraseId, phraseAudioUrl])

	const loadAudio = useCallback(async (): Promise<string | null> => {
		if (audio.status === 'ready' && audio.url) return audio.url
		if (audio.status === 'loading') return null
		if (!phraseId) return null

		setAudio({ status: 'loading' })

		const result = await resolveAudio(phraseId, createAudioPronunciation)
		if (result.ok) {
			setAudio({ status: 'ready', url: result.url })
			return result.url ?? null
		}
		setAudio({ status: 'error' })
		return null
	}, [audio.status, audio.url, phraseId, createAudioPronunciation])

	return { audio, loadAudio }
}

type AudioResult = { ok: true; url: string | undefined } | { ok: false }

// Module-level cache that deduplicates concurrent `createAudioPronunciation`
// requests for the same phraseId. Two component instances of the same phrase
// could otherwise race when the user triggers playback, with the slower one
// failing because the first has already created the audio.
const audioRequestCache = new Map<number, Promise<AudioResult>>()

function resolveAudio(phraseId: number, createAudioPronunciation: CreateAudioFn): Promise<AudioResult> {
	const cached = audioRequestCache.get(phraseId)
	if (cached) return cached

	const request: Promise<AudioResult> = (async () => {
		try {
			const result = await createAudioPronunciation({
				variables: { input: { universalPhraseId: phraseId } },
			})
			return { ok: true, url: result.data?.create_audio_pronunciation.audioUrl }
		} catch {
			return { ok: false }
		}
	})()

	audioRequestCache.set(phraseId, request)
	// Drop errors so a retry is possible; keep successes so late callers reuse them.
	request.then((res) => {
		if (!res.ok) audioRequestCache.delete(phraseId)
	})

	return request
}
