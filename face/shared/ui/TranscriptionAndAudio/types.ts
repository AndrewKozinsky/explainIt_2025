import { LanguageCode } from 'utils/languages'

export type TranscriptionAndAudioProps = {
	phrase?: string
	languageCode?: LanguageCode
	audioUrl?: string | null
	transcription?: string | null
	bg?: 'pale' | 'white'
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
