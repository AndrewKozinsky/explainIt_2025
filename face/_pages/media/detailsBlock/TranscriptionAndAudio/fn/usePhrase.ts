import { useEffect, useState } from 'react'
import { LanguageCode } from 'utils/utils'
import {
	useUniversalPhrase_GetLazyQuery,
	useUniversalPhrase_Create,
	UniversalPhrase_GetLazyQueryHookResult,
	UniversalPhrase_CreateHookResult,
} from '@/graphql'
import { Status } from './types'

type PhraseData = {
	id: number
	transcription?: { ipa?: string | null } | null
	audioPronunciation?: { audioUrl: string } | null
}

type GetPhraseFn = UniversalPhrase_GetLazyQueryHookResult[0]
type CreatePhraseFn = UniversalPhrase_CreateHookResult[0]

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

// Module-level cache that deduplicates concurrent requests for the same phrase.
// Multiple component instances (or remounts of the same component) share a single
// in-flight promise, so the server never receives duplicate `createPhrase` calls.
const phraseRequestCache = new Map<string, Promise<PhraseData | null>>()

function resolvePhrase(
	phrase: string,
	languageCode: LanguageCode,
	getPhrase: GetPhraseFn,
	createPhrase: CreatePhraseFn,
): Promise<PhraseData | null> {
	const key = `${languageCode}:${phrase}`
	const cached = phraseRequestCache.get(key)
	if (cached) return cached

	const request = (async () => {
		const existing = await fetchPhrase(phrase, languageCode, getPhrase)
		if (existing) return existing
		return createNewPhrase(phrase, languageCode, createPhrase)
	})()

	phraseRequestCache.set(key, request)
	// Drop failed/empty results so the next attempt can retry; keep successful
	// ones cached so late remounts reuse the resolved phrase instead of refetching.
	request.then(
		(data) => {
			if (!data) phraseRequestCache.delete(key)
		},
		() => phraseRequestCache.delete(key),
	)

	return request
}

async function fetchPhrase(
	phrase: string,
	languageCode: LanguageCode,
	getPhrase: GetPhraseFn,
): Promise<PhraseData | null> {
	try {
		const result = await getPhrase({
			variables: { input: { phrase, languageCode } },
			fetchPolicy: 'network-only',
		})
		return result.data?.universal_phrase_get ?? null
	} catch {
		return null
	}
}

async function createNewPhrase(
	phrase: string,
	languageCode: LanguageCode,
	createPhrase: CreatePhraseFn,
): Promise<PhraseData | null> {
	try {
		const result = await createPhrase({
			variables: { input: { phrase, languageCode } },
		})
		return result.data?.universal_phrase_create ?? null
	} catch {
		return null
	}
}
