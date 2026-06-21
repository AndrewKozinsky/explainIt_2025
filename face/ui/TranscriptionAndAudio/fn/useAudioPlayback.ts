import { useCallback, useEffect, useRef, useState } from 'react'
import { LanguageCode } from 'utils/languages'
import { useTranscriptionAudioStore, EntryData } from '@/stores/transcriptionAudioStore'

type AudioViewStatus = 'idle' | 'loading' | 'error'

type UseAudioPlaybackInput = {
	phrase?: string
	languageCode?: LanguageCode
	propAudioUrl?: string | null
	storeEntry?: EntryData
	store: typeof useTranscriptionAudioStore
}

type UseAudioPlaybackResult = {
	audioStatus: AudioViewStatus
	isPlaying: boolean
	handleClick: () => void
	showAudioIcon: boolean
}

export function useAudioPlayback(input: UseAudioPlaybackInput): UseAudioPlaybackResult {
	const { phrase, languageCode, propAudioUrl, storeEntry, store } = input

	const audioRef = useRef<HTMLAudioElement | null>(null)
	const [isPlaying, setIsPlaying] = useState(false)

	const resolvedAudioUrl: string | null = propAudioUrl ?? storeEntry?.audioUrl ?? null

	const audioStatus: AudioViewStatus = resolvedAudioUrl
		? 'idle'
		: storeEntry?.audioStatus === 'loading'
			? 'loading'
			: storeEntry?.audioStatus === 'error'
				? 'error'
				: 'idle'

	const handleClick = useCallback(
		async function () {
			if (isPlaying && audioRef.current) {
				audioRef.current.pause()
				setIsPlaying(false)
				return
			}

			let url = resolvedAudioUrl

			if (!url && phrase && languageCode) {
				await store.getState().ensureAudio(phrase, languageCode)

				const updated = store.getState().get(phrase, languageCode)
				url = updated?.audioUrl ?? null
			}

			if (!url) return

			if (!audioRef.current || audioRef.current.src !== url) {
				audioRef.current = new Audio(url)
				audioRef.current.addEventListener('ended', function () {
					setIsPlaying(false)
					if (audioRef.current) audioRef.current.currentTime = 0
				})
			}

			await audioRef.current.play()
			setIsPlaying(true)
		},
		[isPlaying, resolvedAudioUrl, phrase, languageCode, store],
	)

	useEffect(
		function () {
			setIsPlaying(false)

			if (audioRef.current) {
				audioRef.current.pause()
				audioRef.current.currentTime = 0
			}
		},
		[phrase, languageCode, propAudioUrl],
	)

	useEffect(function () {
		return function () {
			audioRef.current?.pause()
			audioRef.current = null
		}
	}, [])

	const hasAudio = propAudioUrl !== undefined || resolvedAudioUrl !== null || !!(phrase && languageCode)

	const showAudioIcon = hasAudio || (storeEntry !== undefined && storeEntry.audioStatus !== 'idle')

	return {
		audioStatus,
		isPlaying,
		handleClick,
		showAudioIcon,
	}
}
