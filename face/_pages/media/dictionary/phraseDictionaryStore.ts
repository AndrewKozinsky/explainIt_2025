import { create } from 'zustand'
import { TranscriptionOutModel, UniversalPhraseTranslationDataOutModel } from '@/graphql'
import { LlmProvider } from '_pages/media/sentenceChat/sentenceChatStore'

export const phraseDictionaryStoreValues: PhraseDictionaryStoreValues = {
	inputText: '',
	status: 'idle',
	translation: null,
	transcription: null,
	audioUrl: null,
	error: null,
	nonExistentWord: false,
	sourceLanguageCode: null,
	targetLanguageCode: 'ru',
	provider: 'deepseek',
	cache: {},
	retryTrigger: 0,
}

export const usePhraseDictionaryStore = create<PhraseDictionaryStoreNext>()((set, get) => {
	return {
		...phraseDictionaryStoreValues,
		setInputText: (text: string) => {
			set({ inputText: text })
		},
		setSourceLanguageCode: (code: string) => {
			set({ sourceLanguageCode: code })
		},
		setTargetLanguageCode: (code: string) => {
			set({ targetLanguageCode: code })
		},
		setTranslationResult: (
			translation: UniversalPhraseTranslationDataOutModel,
			transcription: TranscriptionOutModel | null,
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
		getCachedTranslation: (key: string): null | UniversalPhraseTranslationDataOutModel => {
			return get().cache[key] || null
		},
		setCachedTranslation: (key: string, translation: UniversalPhraseTranslationDataOutModel) => {
			set((state) => ({
				cache: { ...state.cache, [key]: translation },
			}))
		},
		triggerRetry: () => {
			set({ retryTrigger: get().retryTrigger + 1 })
		},
		reset: () => {
			set(phraseDictionaryStoreValues)
		},
	}
})

export function makeCacheKey(text: string, sourceLang: string, targetLang: string): string {
	return `${text}:${sourceLang}:${targetLang}`
}

export type TranslationStatus = 'idle' | 'loading' | 'ready' | 'error'

export type PhraseDictionaryStoreNext = PhraseDictionaryStoreValues & PhraseDictionaryStoreMethods

export type PhraseDictionaryStoreValues = {
	inputText: string
	status: TranslationStatus
	translation: null | UniversalPhraseTranslationDataOutModel
	transcription: TranscriptionOutModel | null
	audioUrl: string | null
	error: null | string
	nonExistentWord: boolean
	sourceLanguageCode: null | string
	targetLanguageCode: string
	provider: LlmProvider
	cache: Record<string, UniversalPhraseTranslationDataOutModel>
	retryTrigger: number
}

export type PhraseDictionaryStoreMethods = {
	setInputText: (text: string) => void
	setSourceLanguageCode: (code: string) => void
	setTargetLanguageCode: (code: string) => void
	setTranslationResult: (
		translation: UniversalPhraseTranslationDataOutModel,
		transcription: TranscriptionOutModel | null,
		audioUrl?: string | null,
	) => void
	setError: (error: string) => void
	setNonExistentWord: () => void
	setStatusLoading: () => void
	getCachedTranslation: (key: string) => null | UniversalPhraseTranslationDataOutModel
	setCachedTranslation: (key: string, translation: UniversalPhraseTranslationDataOutModel) => void
	triggerRetry: () => void
	reset: () => void
}
