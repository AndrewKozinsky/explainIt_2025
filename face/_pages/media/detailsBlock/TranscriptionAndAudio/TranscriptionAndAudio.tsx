import React from 'react'
import cn from 'classnames'
import { ErrorIcon } from 'ui/icons/ErrorIcon/ErrorIcon'
import Spinner from 'ui/Spinner/Spinner'
import { LanguageCode } from 'utils/utils'
// import { AudioBlock } from './AudioBlock'
// import { useAudioPlayer } from './fn/useAudioPlayer'
import { useGetAudioAndTranscription } from './fn/useGetAudioAndTranscription'
import { TranscriptionBlock } from './TranscriptionBlock'
import './TranscriptionAndAudio.scss'

type TranscriptionAndAudioProps = {
	word: string
	languageCode: LanguageCode
	onWhiteBackground?: boolean
}

function TranscriptionAndAudio(props: TranscriptionAndAudioProps) {
	const { word, languageCode, onWhiteBackground } = props
	const { visible, wordStatus, transcription } = useGetAudioAndTranscription(word, languageCode)
	// const { isPlaying, togglePlay } = useAudioPlayer(audio.url)

	if (!visible) return null

	const rootClasses = cn('transcription-audio', onWhiteBackground && ' transcription-audio--white-bg')

	if (wordStatus === 'loading') {
		return (
			<span className={rootClasses}>
				<Spinner size='extra-small' />
			</span>
		)
	}

	if (wordStatus === 'error') {
		return (
			<span className={rootClasses}>
				<ErrorIcon extraClass='transcription-audio__error-icon' />
			</span>
		)
	}

	return (
		<span className={rootClasses}>
			{/*<AudioBlock audio={audio} isPlaying={isPlaying} onTogglePlay={togglePlay} />*/}
			<TranscriptionBlock transcription={transcription} />
		</span>
	)
}

export default TranscriptionAndAudio
