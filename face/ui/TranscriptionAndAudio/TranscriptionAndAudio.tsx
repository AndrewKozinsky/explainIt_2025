import cn from 'classnames'
import BaseButton from 'ui/BaseButton/BaseButton'
import { ErrorIcon } from 'ui/icons/ErrorIcon'
import Spinner from 'ui/Spinner/Spinner'
import { canLanguageHaveTranscription } from 'utils/languages'
import { useTranscriptionAudioStore, makeKey } from '@/stores/transcriptionAudioStore'
import { useAudioPlayback } from './fn/useAudioPlayback'
import { useTranscriptionState } from './fn/useTranscriptionState'
import PauseIcon from './PauseIcon'
import PlayIcon from './PlayIcon'
import { TranscriptionAndAudioProps, TranscriptionState } from './types'
import './TranscriptionAndAudio.scss'

function TranscriptionAndAudio(props: TranscriptionAndAudioProps) {
	const {
		bg = 'pale',
		extraClass,
		phrase,
		languageCode,
		audioUrl: propAudioUrl,
		transcription: propTranscription,
	} = props

	const store = useTranscriptionAudioStore
	const key = phrase && languageCode ? makeKey(phrase, languageCode) : null
	const storeEntry = store(function (s) {
		return key ? s.entries[key] : undefined
	})

	const effectiveTranscription = useTranscriptionState({
		phrase,
		languageCode,
		propTranscription,
		storeEntry,
		store,
	})

	const { audioStatus, isPlaying, handleClick, showAudioIcon } = useAudioPlayback({
		phrase,
		languageCode,
		propAudioUrl,
		storeEntry,
		store,
	})

	if (languageCode && !canLanguageHaveTranscription(languageCode)) return null

	const isLoading = effectiveTranscription?.status === 'loading' || phrase === 'loading'

	const rootClasses = cn(
		'transcription-audio',
		`transcription-audio--${bg}-bg`,
		isLoading && 'transcription-audio--loading',
		extraClass,
	)

	return (
		<BaseButton
			extraClass={rootClasses}
			onClick={handleClick}
			type='button'
			theme={bg === 'pale' ? 'regular' : 'plain'}
		>
			{showAudioIcon ? <AudioIcon audioStatus={audioStatus} isPlaying={isPlaying} /> : null}
			<TranscriptionBlock transcription={effectiveTranscription} />
		</BaseButton>
	)
}

export default TranscriptionAndAudio

// ---- Sub-components ----

type AudioIconProps = {
	audioStatus: 'idle' | 'loading' | 'error'
	isPlaying: boolean
}

function AudioIcon(props: AudioIconProps) {
	const { audioStatus, isPlaying } = props

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

	if (!transcription || transcription.status === 'loading') {
		return null
	}

	if (transcription.status === 'error') {
		return <ErrorIcon extraClass='transcription-audio__error-icon' />
	}

	if (!transcription.transcription) return null

	return transcription.transcription
}
