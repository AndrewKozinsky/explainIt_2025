import cn from 'classnames'
import { ErrorIcon } from 'ui/icons/ErrorIcon/ErrorIcon'
import Spinner from 'ui/Spinner/Spinner'
import { LanguageCode } from 'utils/utils'
import { AudioIcon } from './AudioBlock'
import { useAudio } from './fn/useAudio'
import { useAudioPlayer } from './fn/useAudioPlayer'
import { usePhrase } from './fn/usePhrase'
import { useTranscription } from './fn/useTranscription'
import { TranscriptionBlock } from './TranscriptionBlock'
import './TranscriptionAndAudio.scss'

type TranscriptionAndAudioProps = {
	phrase: string
	languageCode: LanguageCode
	onWhiteBackground?: boolean
}

function TranscriptionAndAudio(props: TranscriptionAndAudioProps) {
	const { phrase, languageCode, onWhiteBackground } = props

	const isSupported = ['en', 'fr'].includes(languageCode)

	const { status, phraseId, phraseTranscription, phraseAudioUrl } = usePhrase(phrase, languageCode, !isSupported)
	const { transcription } = useTranscription({ phraseId, phraseTranscription, phrase })
	const { audio, loadAudio } = useAudio({ phraseId, phraseAudioUrl })
	const { isPlaying, togglePlay } = useAudioPlayer(audio, loadAudio)

	if (!isSupported) return null

	const rootClasses = cn('transcription-audio', onWhiteBackground && 'transcription-audio--white-bg')

	if (status === 'loading') {
		return (
			<span className={rootClasses}>
				<Spinner size='extra-small' />
			</span>
		)
	}

	if (status === 'error') {
		return (
			<span className={rootClasses}>
				<ErrorIcon extraClass='transcription-audio__error-icon' />
			</span>
		)
	}

	return (
		<span className={rootClasses} onClick={togglePlay} role='button' tabIndex={0}>
			<AudioIcon audio={audio} isPlaying={isPlaying} />
			<TranscriptionBlock transcription={transcription} />
		</span>
	)
}

export default TranscriptionAndAudio
