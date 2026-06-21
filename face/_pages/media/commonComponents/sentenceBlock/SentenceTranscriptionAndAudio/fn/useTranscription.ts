import { useEffect, useState } from 'react'
import { useUniversalPhaseTranscriptionGetOrCreate, UniversalPhaseTranscriptionGetOrCreateHookResult } from '@/graphql'
import { getCachedTranscription, upsertCachedTranscription } from './transcriptionCache'
import { TranscriptionData } from './types'

type UseTranscriptionInput = {
	phraseId: number | null
	phraseTranscription: { ipa?: string | null } | null
	phrase: string
}

type CreateTranscriptionFn = UniversalPhaseTranscriptionGetOrCreateHookResult[0]

export function useTranscription({ phraseId, phraseTranscription, phrase }: UseTranscriptionInput) {
	const [transcription, setTranscription] = useState<TranscriptionData>({ status: 'loading' })
	const [createTranscription] = useUniversalPhaseTranscriptionGetOrCreate()

	useEffect(() => {
		if (phraseId === null) return

		let cancelled = false

		const cached = getCachedTranscription(phrase)
		if (cached) {
			setTranscription({ status: 'ready', ipa: cached })
			return
		}

		if (phraseTranscription) {
			const { ipa } = phraseTranscription
			setTranscription({ status: 'ready', ipa })
			if (ipa) upsertCachedTranscription(phrase, ipa)
			return
		}

		setTranscription({ status: 'loading' })

		resolveTranscription(phraseId, createTranscription).then((result) => {
			if (cancelled) return
			if (result.ok) {
				setTranscription({ status: 'ready', ipa: result.ipa })
				if (result.ipa) upsertCachedTranscription(phrase, result.ipa)
			} else {
				setTranscription({ status: 'error' })
			}
		})

		return () => {
			cancelled = true
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [phraseId, phraseTranscription, phrase])

	return { transcription }
}

type TranscriptionResult = { ok: true; ipa: string | null } | { ok: false }

// Module-level cache that deduplicates concurrent `createTranscription` requests
// for the same phraseId. Without this, two component instances mounting in
// parallel both miss the transcription and race to create it — the second
// request fails because the first has already created it.
const transcriptionRequestCache = new Map<number, Promise<TranscriptionResult>>()

function resolveTranscription(
	phraseId: number,
	createTranscription: CreateTranscriptionFn,
): Promise<TranscriptionResult> {
	const cached = transcriptionRequestCache.get(phraseId)
	if (cached) return cached

	const request: Promise<TranscriptionResult> = (async () => {
		try {
			const result = await createTranscription({ variables: { input: { universalPhraseId: phraseId } } })
			return { ok: true, ipa: result.data?.universal_phrase_transcription_get_or_create.ipa ?? null }
		} catch {
			return { ok: false }
		}
	})()

	transcriptionRequestCache.set(phraseId, request)
	// Drop errors so a retry is possible; keep successes so late remounts reuse them.
	request.then((res) => {
		if (!res.ok) transcriptionRequestCache.delete(phraseId)
	})

	return request
}
