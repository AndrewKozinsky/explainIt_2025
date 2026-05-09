import { LanguageCode } from 'utils/utils'

export type TranscriptionAndAudioProps = {
	phrase: string
	languageCode: LanguageCode
	audioUrl?: string | null
	transcription?: TranscriptionState | null
	onWhiteBackground?: boolean
	extraClass?: string
}

export type TranscriptionState = TranscriptionLoading | TranscriptionError | TranscriptionReady

export type TranscriptionLoading = {
	status: 'loading'
}

export type TranscriptionError = {
	status: 'error'
}

export type TranscriptionReady = {
	status: 'ready'
	transcription: string | null
}
