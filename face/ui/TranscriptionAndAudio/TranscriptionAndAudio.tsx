import cn from 'classnames'
import BaseButton from 'ui/BaseButton/BaseButton'
import { ErrorIcon } from 'ui/icons/ErrorIcon'
import { canLanguageHaveTranscription } from 'utils/languages'
import { useAudioPlayer } from './fn/useAudioPlayer'
import PauseIcon from './PauseIcon'
import PlayIcon from './PlayIcon'
import { TranscriptionAndAudioProps, TranscriptionState } from './types'
import './TranscriptionAndAudio.scss'

function TranscriptionAndAudio(props: TranscriptionAndAudioProps) {
	const { phrase, languageCode, audioUrl, transcription, bg = 'pale', extraClass } = props
	const { isPlaying, handleClick, status } = useAudioPlayer({ phrase, languageCode, audioUrl })

	if (!canLanguageHaveTranscription(languageCode)) return null

	const rootClasses = cn(
		'transcription-audio',
		`transcription-audio--${bg}-bg`,
		(phrase === 'loading' || transcription?.status === 'loading') && 'transcription-audio--loading',
		extraClass,
	)
	const canLoadAudio = audioUrl !== undefined

	return (
		<BaseButton extraClass={rootClasses} onClick={handleClick} type='button' theme='regular'>
			<AudioIcon audioStatus={status} isPlaying={isPlaying} hasAudio={canLoadAudio || status !== 'idle'} />
			<TranscriptionBlock transcription={transcription} />
		</BaseButton>
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

	if (!hasAudio || audioStatus === 'loading') {
		return null
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

	if (!transcription || transcription.status === 'loading') {
		return null
	}

	if (transcription.status === 'error') {
		return <ErrorIcon extraClass='transcription-audio__error-icon' />
	}

	if (!transcription.transcription) return null

	return transcription.transcription
}
