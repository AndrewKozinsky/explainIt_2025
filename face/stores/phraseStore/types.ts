import { LanguageCode } from 'utils/languages'

export type EntryStatus = 'idle' | 'loading' | 'ready' | 'error'

export type EntryData = {
	phrase: string
	languageCode: LanguageCode
	phraseId: number | null
	phraseStatus: EntryStatus
	transcription: string | null
	transcriptionStatus: EntryStatus
	audioUrl: string | null
	audioStatus: EntryStatus
}

export type PreloadItem = {
	phrase: string
	languageCode: LanguageCode
	transcription?: string
	audioUrl?: string | null
}

export type PhraseData = {
	id: number
	text: string
	sourceLanguageCode: string
	transcription?: { id: number; universalPhraseId: number; ipa?: string | null; pinyin?: string | null } | null
	audioPronunciation?: { id: number; universalPhraseId: number; audioUrl: string } | null
}

export type PhraseResult = { ok: true; data: PhraseData } | { ok: false }

export type PhraseStoreValues = {
	entries: Record<string, EntryData>
}

export type PhraseStoreMethods = {
	resolvePhrase: (phrase: string, languageCode: LanguageCode) => Promise<PhraseResult>
	preload: (items: PreloadItem[]) => void
	ensureTranscription: (phrase: string, languageCode: LanguageCode) => Promise<void>
	ensureAudio: (phrase: string, languageCode: LanguageCode) => Promise<void>
	get: (phrase: string, languageCode: LanguageCode) => EntryData | undefined
}

export type PhraseStore = PhraseStoreValues & PhraseStoreMethods
