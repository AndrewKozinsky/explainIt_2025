import { useCallback, useEffect, useRef, useState } from 'react'
import { LanguageCode } from 'utils/utils'
import {
	useAudioPronunciation_Create,
	useUniversalPhrase_Create,
	useUniversalPhrase_GetLazyQuery,
	AudioPronunciation_CreateHookResult,
	UniversalPhrase_CreateHookResult,
	UniversalPhrase_GetLazyQueryHookResult,
} from '@/graphql'
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
					sourceLanguageCode: languageCode,
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
	sourceLanguageCode: LanguageCode
	getPhrase: GetPhraseFn
	createPhrase: CreatePhraseFn
	createAudioPronunciation: CreateAudioFn
	setStatus: (status: AudioViewStatus) => void
}): Promise<string | null> {
	const { phrase, sourceLanguageCode, getPhrase, createPhrase, createAudioPronunciation, setStatus } = input
	setStatus('loading')

	const result = await resolveAudioUrl({
		phrase,
		sourceLanguageCode,
		getPhrase,
		createPhrase,
		createAudioPronunciation,
	})
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
	sourceLanguageCode: LanguageCode
	getPhrase: GetPhraseFn
	createPhrase: CreatePhraseFn
	createAudioPronunciation: CreateAudioFn
}): Promise<AudioUrlResult> {
	const { phrase, sourceLanguageCode, getPhrase, createPhrase, createAudioPronunciation } = input
	const phraseData = await resolvePhrase({ phrase, sourceLanguageCode, getPhrase, createPhrase })
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
	sourceLanguageCode: LanguageCode
	getPhrase: GetPhraseFn
	createPhrase: CreatePhraseFn
}): Promise<PhraseData | null> {
	const { phrase, sourceLanguageCode, getPhrase, createPhrase } = input
	const key = `${sourceLanguageCode}:${phrase}`
	const cached = phraseRequestCache.get(key)
	if (cached) return cached

	const request = (async function () {
		const existing = await fetchPhrase({ phrase, sourceLanguageCode, getPhrase })
		if (existing) return existing
		return createNewPhrase({ phrase, sourceLanguageCode, createPhrase })
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
	sourceLanguageCode: LanguageCode
	getPhrase: GetPhraseFn
}): Promise<PhraseData | null> {
	const { phrase, sourceLanguageCode, getPhrase } = input

	try {
		const result = await getPhrase({
			variables: { input: { text: phrase, sourceLanguageCode } },
			fetchPolicy: 'network-only',
		})
		return result.data?.universal_phrase_get ?? null
	} catch {
		return null
	}
}

async function createNewPhrase(input: {
	phrase: string
	sourceLanguageCode: LanguageCode
	createPhrase: CreatePhraseFn
}): Promise<PhraseData | null> {
	const { phrase, sourceLanguageCode, createPhrase } = input

	try {
		const result = await createPhrase({
			variables: { input: { text: phrase, sourceLanguageCode } },
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
