import { useCallback, useEffect, useRef, useState } from 'react'
import { ITranscription } from '../../../transcriptions/transcriptions'
import transcriptionService from '../../../transcriptions/transcriptionService'

export function getComponentTexts(transcriptionData: ITranscription) {
	return {
		engWords: transcriptionData.sentence.split(' '),
		transcriptionWords: transcriptionData.transcription.split(' '),
	}
}

export function useGetAudioPlaying(recordKey: string) {
	const audioRef = useRef<HTMLAudioElement>(null)

	useEffect(() => {
		if (!transcriptionService.getTranscriptionByKey(recordKey as any).audio) {
			return
		}

		const source = getAudioSource(recordKey)
		audioRef.current = new Audio(source)
	}, [recordKey])

	const [isPlay, setIsPlay] = useState(false)
	const [progress, setProgress] = useState(0)

	const playPauseHandler = useCallback(
		async function () {
			if (!audioRef.current) return

			setIsPlay(!isPlay)

			if (isPlay) {
				audioRef.current.pause()
			} else {
				await audioRef.current.play()
			}
		},
		[isPlay],
	)

	useEffect(
		function () {
			if (!audioRef.current) return

			audioRef.current.addEventListener('timeupdate', () => {
				if (!audioRef.current) return

				const { currentTime, duration } = audioRef.current

				const progress = Math.round((currentTime / duration) * 100)
				setProgress(progress)

				if (currentTime / duration === 1) {
					audioRef.current.currentTime = 0
					setIsPlay(false)
				}
			})
		},
		[audioRef.current],
	)

	return {
		isPlay,
		playPauseHandler,
		progress,
	}
}

function getAudioSource(recordName: string): string {
	const audioTest = document.createElement('audio')

	const canPlayOgg = audioTest.canPlayType('audio/ogg; codecs="vorbis"')

	if (canPlayOgg === 'probably' || canPlayOgg === 'maybe') {
		return `/audio/${recordName}.ogg`
	}

	// fallback to mp3
	return `/audio/${recordName}.mp3`
}
