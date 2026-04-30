import cn from 'classnames'
import { ErrorIcon } from 'ui/icons/ErrorIcon/ErrorIcon'
import Spinner from 'ui/Spinner/Spinner'
import { useAudioPlayer } from './fn/useAudioPlayer'
import PauseIcon from './PauseIcon'
import PlayIcon from './PlayIcon'
import { TranscriptionAndAudioProps, TranscriptionState } from './types'
import './TranscriptionAndAudio.scss'

function TranscriptionAndAudio(props: TranscriptionAndAudioProps) {
	const { phrase, languageCode, audioUrl, transcription, onWhiteBackground, extraClass } = props
	const { isPlaying, handleClick, status } = useAudioPlayer({ phrase, languageCode, audioUrl })

	const isSupportedLanguage = ['en', 'fr'].includes(languageCode)
	if (!isSupportedLanguage) return null

	const rootClasses = cn('transcription-audio', onWhiteBackground && 'transcription-audio--white-bg', extraClass)
	const canLoadAudio = audioUrl !== undefined

	return (
		<span className={rootClasses} onClick={handleClick} role='button' tabIndex={0}>
			<AudioIcon audioStatus={status} isPlaying={isPlaying} hasAudio={canLoadAudio || status !== 'idle'} />
			<TranscriptionBlock transcription={transcription} />
		</span>
	)
}

export default TranscriptionAndAudio

type AudioIconProps = {
	audioStatus: 'idle' | 'loading' | 'error'
	isPlaying: boolean
	hasAudio: boolean
}

function AudioIcon(props: AudioIconProps) {
	const { audioStatus, isPlaying, hasAudio } = props

	if (!hasAudio) {
		return null
	}

	if (audioStatus === 'loading') {
		return <Spinner size='extra-small' />
	}

	if (audioStatus === 'error') {
		return <ErrorIcon extraClass='transcription-audio__error-icon' />
	}

	return <span className='transcription-audio__icon-wrapper'>{isPlaying ? <PauseIcon /> : <PlayIcon />}</span>
}

type TranscriptionBlockProps = {
	transcription?: TranscriptionState | null
}

function TranscriptionBlock(props: TranscriptionBlockProps) {
	const { transcription } = props

	if (!transcription) {
		return null
	}

	if (transcription.status === 'loading') {
		return <Spinner size='extra-small' />
	}

	if (transcription.status === 'error') {
		return <ErrorIcon extraClass='transcription-audio__error-icon' />
	}

	if (!transcription.transcription) return null

	return transcription.transcription
}
