import { useCallback, useEffect, useRef, useState } from 'react'
import {
	useAudioPronunciation_Create,
	useUniversalPhrase_Create,
	useUniversalPhrase_GetLazyQuery,
	AudioPronunciation_CreateHookResult,
	UniversalPhrase_CreateHookResult,
	UniversalPhrase_GetLazyQueryHookResult,
} from '@/graphql'
import { LanguageCode } from 'utils/utils'
import { TranscriptionAndAudioProps } from '../types'

type UseAudioPlayerInput = Pick<TranscriptionAndAudioProps, 'audioUrl' | 'phrase' | 'languageCode'>

type AudioViewStatus = 'idle' | 'loading' | 'error'
type GetPhraseFn = UniversalPhrase_GetLazyQueryHookResult[0]
type CreatePhraseFn = UniversalPhrase_CreateHookResult[0]
type CreateAudioFn = AudioPronunciation_CreateHookResult[0]

type PhraseData = {
	id: number
	audioPronunciation?: { audioUrl?: string | null } | null
}

type AudioUrlResult = { ok: true; url: string | null } | { ok: false }

export function useAudioPlayer(input: UseAudioPlayerInput) {
	const { audioUrl, phrase, languageCode } = input
	const audioRef = useRef<HTMLAudioElement | null>(null)
	const [isPlaying, setIsPlaying] = useState(false)
	const [status, setStatus] = useState<AudioViewStatus>('idle')
	const [resolvedAudioUrl, setResolvedAudioUrl] = useState<string | null>(audioUrl ?? null)
	const [getPhrase] = useUniversalPhrase_GetLazyQuery()
	const [createPhrase] = useUniversalPhrase_Create()
	const [createAudioPronunciation] = useAudioPronunciation_Create()

	useEffect(
		function () {
			setResolvedAudioUrl(audioUrl ?? null)
			setStatus('idle')
			setIsPlaying(false)
			audioRef.current?.pause()
			if (audioRef.current) {
				audioRef.current.currentTime = 0
			}
		},
		[audioUrl, phrase, languageCode],
	)

	useEffect(function () {
		return function () {
			audioRef.current?.pause()
			audioRef.current = null
		}
	}, [])

	const handleClick = useCallback(
		async function () {
			if (isPlaying && audioRef.current) {
				audioRef.current.pause()
				setIsPlaying(false)
				return
			}

			const nextAudioUrl =
				resolvedAudioUrl ??
				(await loadAudioUrl({
					phrase,
					languageCode,
					getPhrase,
					createPhrase,
					createAudioPronunciation,
					setStatus,
				}))

			if (!nextAudioUrl) {
				return
			}

			setResolvedAudioUrl(nextAudioUrl)
			setStatus('idle')

			if (!audioRef.current || audioRef.current.src !== nextAudioUrl) {
				audioRef.current = new Audio(nextAudioUrl)
				audioRef.current.addEventListener('ended', function () {
					setIsPlaying(false)
					if (audioRef.current) audioRef.current.currentTime = 0
				})
			}

			await audioRef.current.play()
			setIsPlaying(true)
		},
		[createAudioPronunciation, createPhrase, getPhrase, isPlaying, languageCode, phrase, resolvedAudioUrl],
	)

	return { isPlaying, handleClick, status }
}

async function loadAudioUrl(input: {
	phrase: string
	languageCode: LanguageCode
	getPhrase: GetPhraseFn
	createPhrase: CreatePhraseFn
	createAudioPronunciation: CreateAudioFn
	setStatus: (status: AudioViewStatus) => void
}): Promise<string | null> {
	const { phrase, languageCode, getPhrase, createPhrase, createAudioPronunciation, setStatus } = input
	setStatus('loading')

	const result = await resolveAudioUrl({ phrase, languageCode, getPhrase, createPhrase, createAudioPronunciation })
	if (!result.ok) {
		setStatus('error')
		return null
	}

	return result.url
}

const phraseRequestCache = new Map<string, Promise<PhraseData | null>>()
const audioRequestCache = new Map<number, Promise<AudioUrlResult>>()

async function resolveAudioUrl(input: {
	phrase: string
	languageCode: LanguageCode
	getPhrase: GetPhraseFn
	createPhrase: CreatePhraseFn
	createAudioPronunciation: CreateAudioFn
}): Promise<AudioUrlResult> {
	const { phrase, languageCode, getPhrase, createPhrase, createAudioPronunciation } = input
	const phraseData = await resolvePhrase({ phrase, languageCode, getPhrase, createPhrase })
	if (!phraseData) {
		return { ok: false }
	}

	const existingAudioUrl = phraseData.audioPronunciation?.audioUrl ?? null
	if (existingAudioUrl) {
		return { ok: true, url: existingAudioUrl }
	}

	return resolveAudio(phraseData.id, createAudioPronunciation)
}

function resolvePhrase(input: {
	phrase: string
	languageCode: LanguageCode
	getPhrase: GetPhraseFn
	createPhrase: CreatePhraseFn
}): Promise<PhraseData | null> {
	const { phrase, languageCode, getPhrase, createPhrase } = input
	const key = `${languageCode}:${phrase}`
	const cached = phraseRequestCache.get(key)
	if (cached) return cached

	const request = (async function () {
		const existing = await fetchPhrase({ phrase, languageCode, getPhrase })
		if (existing) return existing
		return createNewPhrase({ phrase, languageCode, createPhrase })
	})()

	phraseRequestCache.set(key, request)
	request.then(
		function (data) {
			if (!data) phraseRequestCache.delete(key)
		},
		function () {
			phraseRequestCache.delete(key)
		},
	)

	return request
}

async function fetchPhrase(input: {
	phrase: string
	languageCode: LanguageCode
	getPhrase: GetPhraseFn
}): Promise<PhraseData | null> {
	const { phrase, languageCode, getPhrase } = input

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

async function createNewPhrase(input: {
	phrase: string
	languageCode: LanguageCode
	createPhrase: CreatePhraseFn
}): Promise<PhraseData | null> {
	const { phrase, languageCode, createPhrase } = input

	try {
		const result = await createPhrase({
			variables: { input: { phrase, languageCode } },
		})
		return result.data?.universal_phrase_create ?? null
	} catch {
		return null
	}
}

function resolveAudio(phraseId: number, createAudioPronunciation: CreateAudioFn): Promise<AudioUrlResult> {
	const cached = audioRequestCache.get(phraseId)
	if (cached) return cached

	const request: Promise<AudioUrlResult> = (async function () {
		try {
			const result = await createAudioPronunciation({
				variables: { input: { universalPhraseId: phraseId } },
			})
			return { ok: true, url: result.data?.create_audio_pronunciation.audioUrl ?? null }
		} catch {
			return { ok: false }
		}
	})()

	audioRequestCache.set(phraseId, request)
	request.then(function (result) {
		if (!result.ok) audioRequestCache.delete(phraseId)
	})

	return request
}
