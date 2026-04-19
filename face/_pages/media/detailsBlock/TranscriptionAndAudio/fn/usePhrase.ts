import { useEffect, useRef, useState } from 'react'
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

export function usePhrase(phrase: string, languageCode: LanguageCode, skip: boolean): PhraseResult {
	const [status, setStatus] = useState<Status>('loading')
	const [phraseId, setPhraseId] = useState<number | null>(null)
	const [phraseTranscription, setPhraseTranscription] = useState<{ ipa?: string | null } | null>(null)
	const [phraseAudioUrl, setPhraseAudioUrl] = useState<string | null>(null)

	const [getPhrase] = useUniversalPhrase_GetLazyQuery()
	const [createPhrase] = useUniversalPhrase_Create()

	const activeWordRef = useRef(phrase)
	const creationAttemptedRef = useRef(false)

	useEffect(() => {
		if (skip) return

		activeWordRef.current = phrase
		creationAttemptedRef.current = false

		setStatus('loading')
		setPhraseId(null)
		setPhraseTranscription(null)
		setPhraseAudioUrl(null)

		loadPhrase()

		async function loadPhrase() {
			const phraseData = await fetchPhrase(phrase, languageCode, getPhrase)

			if (activeWordRef.current !== phrase) return

			if (phraseData) {
				applyPhraseData(phraseData)
				return
			}

			// Phrase not found — create it (only once per phrase/languageCode)
			if (creationAttemptedRef.current) {
				setStatus('error')
				return
			}
			creationAttemptedRef.current = true

			const createdPhrase = await createNewPhrase(phrase, languageCode, createPhrase)
			if (activeWordRef.current !== phrase) return

			if (createdPhrase) {
				applyPhraseData(createdPhrase)
			} else {
				setStatus('error')
			}
		}

		function applyPhraseData(data: PhraseData) {
			setPhraseId(data.id)
			setPhraseTranscription(data.transcription ?? null)
			setPhraseAudioUrl(data.audioPronunciation?.audioUrl ?? null)
			setStatus('ready')
		}
	}, [phrase, languageCode, skip, getPhrase, createPhrase])

	return { status, phraseId, phraseTranscription, phraseAudioUrl }
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
