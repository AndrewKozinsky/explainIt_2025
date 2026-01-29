import { create } from 'zustand'

export const selectedSentenceStoreValues: SelectedSentenceStoreValues = {
	sentenceId: 0,
	sentenceText: '',
	translationProvider: 'chatGPTNano',
	translation: null,
	analysis: null,
	sentenceTranslations: [],
	sentenceTranslationsLoading: false,
	wordIds: [],
	selectWord: () => {},
}

export const useSelectedSentenceStore = create<SelectedSentenceStoreNext>()((set, get) => {
	return {
		...selectedSentenceStoreValues,
		updateStore: (storePart: Partial<SelectedSentenceStoreValues>) => {
			set(storePart)
		},
		setTranslationProvider: (provider: SentenceTranslationProvider) => {
			const store = get()
			const translationFromCache = findTranslationByProvider(store.sentenceTranslations, provider)

			set({
				translationProvider: provider,
				translation: translationFromCache?.translation ?? null,
				analysis: translationFromCache?.analysis ?? null,
			})
		},
		setSentenceTranslations: (sentenceTranslations: SentenceTranslationLite[]) => {
			const store = get()
			const translationFromCache = findTranslationByProvider(sentenceTranslations, store.translationProvider)

			set({
				sentenceTranslations,
				translation: translationFromCache?.translation ?? null,
				analysis: translationFromCache?.analysis ?? null,
			})
		},
		upsertSentenceTranslation: (sentenceTranslation: SentenceTranslationLite) => {
			const store = get()
			const updatedList = upsertSentenceTranslation(store.sentenceTranslations, sentenceTranslation)
			const translationFromCache = findTranslationByProvider(updatedList, store.translationProvider)

			set({
				sentenceTranslations: updatedList,
				translation: translationFromCache?.translation ?? null,
				analysis: translationFromCache?.analysis ?? null,
			})
		},
	}
})

export type SelectedSentenceStoreNext = SelectedSentenceStoreValues & SelectedSentenceStoreMethods

export type SentenceTranslationProvider = 'yandexTranslate' | 'chatGPTNano' | 'chatGPTMini' | 'chatGPTStandard'

export type SentenceTranslationLite = {
	id: number
	sentenceId: number
	provider: SentenceTranslationProvider
	translation: string
	analysis: null | string
	createdAt: string
}

export type SelectedSentenceStoreValues = {
	sentenceId: number
	sentenceText: string
	translationProvider: SentenceTranslationProvider
	translation: null | string
	analysis: null | string
	sentenceTranslations: SentenceTranslationLite[]
	sentenceTranslationsLoading: boolean
	wordIds: number[]
	selectWord: (input: { sentenceId: number; wordId: number }) => void
}

export type SelectedSentenceStoreMethods = {
	updateStore: (store: Partial<SelectedSentenceStoreValues>) => void
	setTranslationProvider: (provider: SentenceTranslationProvider) => void
	setSentenceTranslations: (sentenceTranslations: SentenceTranslationLite[]) => void
	upsertSentenceTranslation: (sentenceTranslation: SentenceTranslationLite) => void
}

function findTranslationByProvider(
	translations: SentenceTranslationLite[],
	provider: SentenceTranslationProvider,
): SentenceTranslationLite | undefined {
	return translations.find((t) => t.provider === provider)
}

function upsertSentenceTranslation(
	translations: SentenceTranslationLite[],
	sentenceTranslation: SentenceTranslationLite,
): SentenceTranslationLite[] {
	const index = translations.findIndex((t) => t.provider === sentenceTranslation.provider)
	if (index === -1) return [...translations, sentenceTranslation]

	const next = [...translations]
	next[index] = sentenceTranslation
	return next
}
