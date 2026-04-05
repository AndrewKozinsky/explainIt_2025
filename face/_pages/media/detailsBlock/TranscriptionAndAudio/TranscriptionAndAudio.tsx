import React from 'react'
import { ErrorIcon } from 'ui/icons/ErrorIcon/ErrorIcon'
import Spinner from 'ui/Spinner/Spinner'
import { LanguageCode } from 'utils/utils'
import { AudioBlock } from './AudioBlock'
import { useAudioPlayer } from './fn/useAudioPlayer'
import { useGetAudioAndTranscription } from './fn/useGetAudioAndTranscription'
import { TranscriptionBlock } from './TranscriptionBlock'
import './TranscriptionAndAudio.scss'

type TranscriptionAndAudioProps = {
	word: string
	languageCode: LanguageCode
}

function TranscriptionAndAudio(props: TranscriptionAndAudioProps) {
	const { word, languageCode } = props
	const { visible, wordStatus, audio, transcription } = useGetAudioAndTranscription(word, languageCode)
	const { isPlaying, togglePlay } = useAudioPlayer(audio.url)

	if (!visible) return null

	if (wordStatus === 'loading') {
		return (
			<span className='transcription-audio'>
				<Spinner size='extra-small' />
			</span>
		)
	}

	if (wordStatus === 'error') {
		return (
			<span className='transcription-audio'>
				<ErrorIcon extraClass='transcription-audio__error-icon' />
			</span>
		)
	}

	return (
		<span className='transcription-audio'>
			<AudioBlock audio={audio} isPlaying={isPlaying} onTogglePlay={togglePlay} />
			<TranscriptionBlock transcription={transcription} />
		</span>
	)
}

export default TranscriptionAndAudio
