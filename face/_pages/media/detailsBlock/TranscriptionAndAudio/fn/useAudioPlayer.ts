import { useCallback, useEffect, useRef, useState } from 'react'
import { AudioData } from './types'

export function useAudioPlayer(audio: AudioData, loadAudio: () => Promise<string | null>) {
	const audioRef = useRef<HTMLAudioElement | null>(null)
	const [isPlaying, setIsPlaying] = useState(false)

	useEffect(() => {
		return () => {
			audioRef.current?.pause()
			audioRef.current = null
		}
	}, [])

	const togglePlay = useCallback(async () => {
		if (isPlaying && audioRef.current) {
			audioRef.current.pause()
			setIsPlaying(false)
			return
		}

		const url = audio.url ?? (await loadAudio())
		if (!url) return

		if (!audioRef.current || audioRef.current.src !== url) {
			audioRef.current = new Audio(url)
			audioRef.current.addEventListener('ended', () => {
				setIsPlaying(false)
				if (audioRef.current) audioRef.current.currentTime = 0
			})
		}

		audioRef.current.play()
		setIsPlaying(true)
	}, [audio.url, isPlaying, loadAudio])

	return { isPlaying, togglePlay }
}
