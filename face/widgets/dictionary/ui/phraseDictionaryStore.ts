import { create } from 'zustand'
import type { TranscriptionModel } from '@/entities/phrase/repository/PhraseRepository'
import type { PhraseTranslationDataModel } from '@/entities/universalPhrase/repository/PhraseTranslationRepository'
import { LanguageCode, languages } from '@/shared/utils/languages'

export const phraseDictionaryStoreValues: PhraseDictionaryStoreValues = {
	languageCode: languages.en.code as LanguageCode,
	targetLanguageCode: null,
	inputText: '',
	status: 'idle',
	translation: null,
	transcription: null,
	audioUrl: null,
	error: null,
	nonExistentWord: false,
	retryTrigger: 0,
}

export const usePhraseDictionaryStore = create<PhraseDictionaryStoreNext>()((set, get) => {
	return {
		...phraseDictionaryStoreValues,
		setInputText: (text: string) => {
			set({ inputText: text })
		},
		setTranslationResult: (
			translation: PhraseTranslationDataModel,
			transcription: TranscriptionModel | null,
			audioUrl?: string | null,
		) => {
			set({ translation, transcription, audioUrl: audioUrl ?? null, status: 'ready', error: null })
		},
		setError: (error: string) => {
			set({ error, status: 'error', nonExistentWord: false })
		},
		setNonExistentWord: () => {
			set({ nonExistentWord: true, status: 'ready', error: null, translation: null })
		},
		setStatusLoading: () => {
			set({ status: 'loading', error: null, nonExistentWord: false })
		},
		triggerRetry: () => {
			set({ retryTrigger: get().retryTrigger + 1 })
		},
	}
})

export type TranslationStatus = 'idle' | 'loading' | 'ready' | 'error'

export type PhraseDictionaryStoreNext = PhraseDictionaryStoreValues & PhraseDictionaryStoreMethods

export type PhraseDictionaryStoreValues = {
	languageCode: LanguageCode
	targetLanguageCode: string | null
	inputText: string
	status: TranslationStatus
	translation: null | PhraseTranslationDataModel
	transcription: TranscriptionModel | null
	audioUrl: string | null
	error: null | string
	nonExistentWord: boolean
	retryTrigger: number
}

export type PhraseDictionaryStoreMethods = {
	setInputText: (text: string) => void
	setTranslationResult: (
		translation: PhraseTranslationDataModel,
		transcription: TranscriptionModel | null,
		audioUrl?: string | null,
	) => void
	setError: (error: string) => void
	setNonExistentWord: () => void
	setStatusLoading: () => void
	triggerRetry: () => void
}
