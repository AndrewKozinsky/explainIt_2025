import { useCallback, useEffect, useState } from 'react'
import { useAudioPronunciation_Create } from '@/graphql'
import { AudioData } from './types'

type UseAudioInput = {
	phraseId: number | null
	phraseAudioUrl: string | null
}

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

		try {
			const result = await createAudioPronunciation({
				variables: { input: { universalPhraseId: phraseId } },
			})

			const audioUrl = result.data?.create_audio_pronunciation.audioUrl
			setAudio({ status: 'ready', url: audioUrl })

			return audioUrl ?? null
		} catch {
			setAudio({ status: 'error' })
			return null
		}
	}, [audio.status, audio.url, phraseId, createAudioPronunciation])

	return { audio, loadAudio }
}
