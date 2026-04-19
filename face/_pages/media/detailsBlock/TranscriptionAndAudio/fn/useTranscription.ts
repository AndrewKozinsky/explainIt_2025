import { useEffect, useState } from 'react'
import { useTranscription_Create } from '@/graphql'
import { getCachedTranscription, upsertCachedTranscription } from './transcriptionCache'
import { TranscriptionData } from './types'

type UseTranscriptionInput = {
	phraseId: number | null
	phraseTranscription: { ipa?: string | null } | null
	phrase: string
}

export function useTranscription({ phraseId, phraseTranscription, phrase }: UseTranscriptionInput) {
	const [transcription, setTranscription] = useState<TranscriptionData>({ status: 'loading' })
	const [createTranscription] = useTranscription_Create()

	useEffect(() => {
		if (phraseId === null) return

		// Check store cache first
		const cached = getCachedTranscription(phrase)
		if (cached) {
			setTranscription({ status: 'ready', ipa: cached })
			return
		}

		// Transcription already exists in phrase data
		if (phraseTranscription) {
			const { ipa } = phraseTranscription
			setTranscription({ status: 'ready', ipa })

			if (ipa) upsertCachedTranscription(phrase, ipa)
			return
		}

		// No transcription — generate it
		setTranscription({ status: 'loading' })
		generateTranscription(phraseId)

		async function generateTranscription(id: number) {
			try {
				const result = await createTranscription({ variables: { input: { universalPhraseId: id } } })
				const ipa = result.data?.create_transcription.ipa ?? null

				setTranscription({ status: 'ready', ipa })

				if (ipa) upsertCachedTranscription(phrase, ipa)
			} catch {
				setTranscription({ status: 'error' })
			}
		}
	}, [phraseId, phraseTranscription, phrase])

	return { transcription }
}
