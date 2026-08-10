// import { create } from 'zustand'
// import type { TranscriptionModel } from '@/entities/phrase/repository/PhraseRepository'
// import { PhraseTranslationDataModel } from '@/entities/universalPhrase/repository/PhraseTranslationRepository'
// import { LlmProvider } from '_pages/media/sentenceChat/sentenceChatStore'

/*export const phraseDictionaryStoreValues: PhraseDictionaryStoreValues = {
	inputText: '',
	status: 'idle',
	translation: null,
	transcription: null,
	audioUrl: null,
	error: null,
	nonExistentWord: false,
	sourceLanguageCode: null,
	// provider: 'deepseek',
	retryTrigger: 0,
}*/

/*export const usePhraseDictionaryStore = create<PhraseDictionaryStoreNext>()((set, get) => {
	return {
		...phraseDictionaryStoreValues,
		setInputText: (text: string) => {
			set({ inputText: text })
		},
		setSourceLanguageCode: (code: string) => {
			set({ sourceLanguageCode: code })
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
		/!*reset: () => {
			set(phraseDictionaryStoreValues)
		},*!/
	}
})*/

// export type TranslationStatus = 'idle' | 'loading' | 'ready' | 'error'

// export type PhraseDictionaryStoreNext = PhraseDictionaryStoreValues & PhraseDictionaryStoreMethods

/*export type PhraseDictionaryStoreValues = {
	inputText: string
	status: TranslationStatus
	translation: null | PhraseTranslationDataModel
	transcription: TranscriptionModel | null
	audioUrl: string | null
	error: null | string
	nonExistentWord: boolean
	sourceLanguageCode: null | string
	// provider: LlmProvider
	retryTrigger: number
}*/

/*export type PhraseDictionaryStoreMethods = {
	setInputText: (text: string) => void
	setSourceLanguageCode: (code: string) => void
	setTranslationResult: (
		translation: PhraseTranslationDataModel,
		transcription: TranscriptionModel | null,
		audioUrl?: string | null,
	) => void
	setError: (error: string) => void
	setNonExistentWord: () => void
	setStatusLoading: () => void
	triggerRetry: () => void
}*/
