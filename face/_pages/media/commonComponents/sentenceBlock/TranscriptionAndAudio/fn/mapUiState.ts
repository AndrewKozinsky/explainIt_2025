import { TranscriptionState } from 'ui/TranscriptionAndAudio/types'
import { LanguageCode } from 'utils/languages'

type TranscriptionInput = {
	status: string
	ipa?: string | null
}

type MapUiStateInput = {
	phrase: string
	languageCode: LanguageCode
	audioUrl: string | null
	transcription: TranscriptionInput
}

export function mapUiState(input: MapUiStateInput) {
	const { phrase, languageCode, audioUrl, transcription } = input

	return {
		phrase,
		languageCode,
		audioUrl,
		transcription: mapTranscription(transcription),
	}
}

export function mapTranscription(transcription: TranscriptionInput): TranscriptionState | null {
	if (transcription.status === 'loading') {
		return { status: 'loading' }
	}

	if (transcription.status === 'error') {
		return { status: 'error' }
	}

	if (transcription.status === 'ready') {
		return { status: 'ready', transcription: transcription.ipa ?? null }
	}

	return null
}
