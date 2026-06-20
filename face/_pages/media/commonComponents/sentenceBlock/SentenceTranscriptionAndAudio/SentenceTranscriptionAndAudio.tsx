import TranscriptionAndAudio from 'ui/TranscriptionAndAudio/TranscriptionAndAudio'
import { LanguageCode } from 'utils/languages'
import { mapUiState } from './fn/mapUiState'
import { usePhrase } from './fn/usePhrase'
import { useTranscription } from './fn/useTranscription'

type TranscriptionAndAudioProps = {
	phrase: string
	languageCode: LanguageCode
	onWhiteBackground?: boolean
}

function SentenceTranscriptionAndAudio(props: TranscriptionAndAudioProps) {
	const { phrase, languageCode, onWhiteBackground } = props

	const { status, phraseId, phraseTranscription, phraseAudioUrl } = usePhrase(phrase, languageCode)
	const { transcription } = useTranscription({ phraseId, phraseTranscription, phrase })

	if (status === 'loading') {
		return (
			<TranscriptionAndAudio
				phrase={phrase}
				languageCode={languageCode}
				transcription={{ status: 'loading' }}
				bg={onWhiteBackground ? 'white' : 'pale'}
			/>
		)
	}

	if (status === 'error') {
		return (
			<TranscriptionAndAudio
				phrase={phrase}
				languageCode={languageCode}
				transcription={{ status: 'error' }}
				bg={onWhiteBackground ? 'white' : 'pale'}
			/>
		)
	}

	return (
		<TranscriptionAndAudio
			{...mapUiState({ phrase, languageCode, audioUrl: phraseAudioUrl, transcription })}
			bg={onWhiteBackground ? 'white' : 'pale'}
		/>
	)
}

export default SentenceTranscriptionAndAudio
