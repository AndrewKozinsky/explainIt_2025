// import { useCallback, useEffect, useRef, useState } from 'react'
// import { universalPhraseService } from '@/entities/universalPhrase/UniversalPhraseService'
// import { LanguageCode } from '@/shared/utils/languages'

// type AudioViewStatus = 'idle' | 'loading' | 'error'

/*type UseAudioPlaybackInput = {
	phrase?: string
	languageCode?: LanguageCode
	propAudioUrl?: string | null
}*/

/*type UseAudioPlaybackResult = {
	audioStatus: AudioViewStatus
	isPlaying: boolean
	handleClick: () => void
	showAudioIcon: boolean
}*/

/*export function useAudioPlayback(input: UseAudioPlaybackInput): UseAudioPlaybackResult {
	const { phrase, languageCode, propAudioUrl } = input

	const audioRef = useRef<HTMLAudioElement | null>(null)
	const [isPlaying, setIsPlaying] = useState(false)
	const [audioUrl, setAudioUrl] = useState<string | null>(null)
	const [audioLoading, setAudioLoading] = useState(false)
	const [audioError, setAudioError] = useState(false)

	const resolvedAudioUrl: string | null = propAudioUrl ?? audioUrl ?? null

	const audioStatus: AudioViewStatus = resolvedAudioUrl
		? 'idle'
		: audioLoading
			? 'loading'
			: audioError
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
				setAudioLoading(true)
				setAudioError(false)

				const result = await universalPhraseService.getAudio(phrase, languageCode)
				setAudioLoading(false)

				if (result.ok) {
					url = result.data.audioUrl
					setAudioUrl(url)
				} else {
					setAudioError(true)
					return
				}
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
		[isPlaying, resolvedAudioUrl, phrase, languageCode],
	)

	useEffect(
		function () {
			setIsPlaying(false)
			setAudioUrl(null)
			setAudioLoading(false)
			setAudioError(false)

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

	// Если есть проп audioUrl — не показываем иконку пока не уверены, что аудио существует
	const showAudioIcon = hasAudio || audioLoading

	return {
		audioStatus,
		isPlaying,
		handleClick,
		showAudioIcon,
	}
}*/
