import UiTranscriptionAndAudio from 'ui/TranscriptionAndAudio/TranscriptionAndAudio'
import { LanguageCode } from 'utils/utils'
import { mapUiState } from './fn/mapUiState'
import { usePhrase } from './fn/usePhrase'
import { useTranscription } from './fn/useTranscription'

type TranscriptionAndAudioProps = {
	phrase: string
	languageCode: LanguageCode
	onWhiteBackground?: boolean
}

function TranscriptionAndAudio(props: TranscriptionAndAudioProps) {
	const { phrase, languageCode, onWhiteBackground } = props

	const { status, phraseId, phraseTranscription, phraseAudioUrl } = usePhrase(phrase, languageCode)
	const { transcription } = useTranscription({ phraseId, phraseTranscription, phrase })

	if (status === 'loading') {
		return (
			<UiTranscriptionAndAudio
				phrase={phrase}
				languageCode={languageCode}
				transcription={{ status: 'loading' }}
				onWhiteBackground={onWhiteBackground}
			/>
		)
	}

	if (status === 'error') {
		return (
			<UiTranscriptionAndAudio
				phrase={phrase}
				languageCode={languageCode}
				transcription={{ status: 'error' }}
				onWhiteBackground={onWhiteBackground}
			/>
		)
	}

	return (
		<UiTranscriptionAndAudio
			{...mapUiState({ phrase, languageCode, audioUrl: phraseAudioUrl, transcription })}
			onWhiteBackground={onWhiteBackground}
		/>
	)
}

export default TranscriptionAndAudio
