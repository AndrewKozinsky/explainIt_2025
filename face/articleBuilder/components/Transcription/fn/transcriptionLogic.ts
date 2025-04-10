import { useCallback, useEffect, useRef, useState } from 'react'
import { ITranscription } from '../../../transcriptionService/transcriptions'

export function getComponentTexts(transcriptionData: ITranscription) {
	return {
		engWords: transcriptionData.sentence.split(' '),
		transcriptionWords: transcriptionData.transcription.split(' '),
	}
}

export function useGetAudioPlaying(recordName: string) {
	const audioRef = useRef(new Audio('/audio/' + recordName + '.mp3'))
	const [isPlay, setIsPlay] = useState(false)
	const [progress, setProgress] = useState(0)

	const playPauseHandler = useCallback(
		async function () {
			setIsPlay(!isPlay)

			if (isPlay) {
				audioRef.current.pause()
			} else {
				await audioRef.current.play()
			}
		},
		[isPlay],
	)

	useEffect(function () {
		audioRef.current.addEventListener('timeupdate', () => {
			const { currentTime, duration } = audioRef.current

			const progress = (currentTime / duration) * 100
			setProgress(progress)
		})
	}, [])

	return {
		isPlay,
		playPauseHandler,
		progress,
	}
}
