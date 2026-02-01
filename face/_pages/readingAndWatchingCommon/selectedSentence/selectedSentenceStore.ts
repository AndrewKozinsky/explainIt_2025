import { create } from 'zustand'

export const selectedSentenceStoreValues: SelectedSentenceStoreValues = {
	sentenceId: 0,
	sentenceText: '',
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
		setSentenceTranslations: (sentenceTranslations: SentenceTranslationLite[]) => {
			const lastTranslation = sentenceTranslations[sentenceTranslations.length - 1]

			set({
				sentenceTranslations,
				translation: lastTranslation?.translation ?? null,
				analysis: lastTranslation?.analysis ?? null,
			})
		},
		upsertSentenceTranslation: (sentenceTranslation: SentenceTranslationLite) => {
			const nextSentenceTranslations = upsertSentenceTranslation(get().sentenceTranslations, sentenceTranslation)
			const lastTranslation = nextSentenceTranslations[nextSentenceTranslations.length - 1]

			set({
				sentenceTranslations: nextSentenceTranslations,
				translation: lastTranslation?.translation ?? null,
				analysis: lastTranslation?.analysis ?? null,
			})
		},
	}
})

export type SelectedSentenceStoreNext = SelectedSentenceStoreValues & SelectedSentenceStoreMethods

export type SentenceTranslationLite = {
	id: number
	sentenceId: number
	translation: string
	analysis: null | string
	createdAt: string
}

export type SelectedSentenceStoreValues = {
	sentenceId: number
	sentenceText: string
	translation: null | string
	analysis: null | string
	sentenceTranslations: SentenceTranslationLite[]
	sentenceTranslationsLoading: boolean
	wordIds: number[]
	selectWord: (input: { sentenceId: number; wordId: number }) => void
}

export type SelectedSentenceStoreMethods = {
	updateStore: (store: Partial<SelectedSentenceStoreValues>) => void
	setSentenceTranslations: (sentenceTranslations: SentenceTranslationLite[]) => void
	upsertSentenceTranslation: (sentenceTranslation: SentenceTranslationLite) => void
}

function upsertSentenceTranslation(
	translations: SentenceTranslationLite[],
	sentenceTranslation: SentenceTranslationLite,
): SentenceTranslationLite[] {
	const index = translations.findIndex((t) => t.id === sentenceTranslation.id)
	if (index === -1) return [...translations, sentenceTranslation]

	const next = [...translations]
	next[index] = sentenceTranslation
	return next
}
