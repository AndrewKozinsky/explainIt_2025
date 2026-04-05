import { useCallback, useEffect, useRef, useState } from 'react'

export function useAudioPlayer(audioUrl?: string) {
	const audioRef = useRef<HTMLAudioElement | null>(null)
	const [isPlaying, setIsPlaying] = useState(false)

	useEffect(
		function () {
			if (!audioUrl) return

			const audio = new Audio(audioUrl)
			audioRef.current = audio

			function handleEnded() {
				setIsPlaying(false)
				audio.currentTime = 0
			}

			audio.addEventListener('ended', handleEnded)

			return function () {
				audio.removeEventListener('ended', handleEnded)
				audio.pause()
				audioRef.current = null
			}
		},
		[audioUrl],
	)

	const togglePlay = useCallback(
		function () {
			const audio = audioRef.current
			if (!audio) return

			if (isPlaying) {
				audio.pause()
				setIsPlaying(false)
			} else {
				audio.play()
				setIsPlaying(true)
			}
		},
		[isPlaying],
	)

	return { isPlaying, togglePlay }
}
