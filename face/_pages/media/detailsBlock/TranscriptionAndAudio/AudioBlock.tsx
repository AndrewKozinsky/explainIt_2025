import React from 'react'
import { ErrorIcon } from 'ui/icons/ErrorIcon/ErrorIcon'
import Spinner from 'ui/Spinner/Spinner'
import { AudioData } from './fn/useGetAudioAndTranscription'

type AudioBlockProps = {
	audio: AudioData
	isPlaying: boolean
	onTogglePlay: () => void
}

export function AudioBlock(props: AudioBlockProps) {
	const { audio, isPlaying, onTogglePlay } = props

	if (audio.status === 'loading') {
		return <Spinner size='extra-small' />
	}

	if (audio.status === 'error') {
		return <ErrorIcon extraClass='transcription-audio__error-icon' />
	}

	return (
		<button className='transcription-audio__play-btn' onClick={onTogglePlay} type='button'>
			{isPlaying ? <PauseIcon /> : <PlayIcon />}
		</button>
	)
}

function PlayIcon() {
	return (
		<svg
			className='transcription-audio__icon'
			viewBox='0 0 16 16'
			fill='currentColor'
			xmlns='http://www.w3.org/2000/svg'
		>
			<path d='M4 2.5v11l9-5.5L4 2.5z' />
		</svg>
	)
}

function PauseIcon() {
	return (
		<svg
			className='transcription-audio__icon'
			viewBox='0 0 16 16'
			fill='currentColor'
			xmlns='http://www.w3.org/2000/svg'
		>
			<path d='M3.5 2h3v12h-3V2zm6 0h3v12h-3V2z' />
		</svg>
	)
}
