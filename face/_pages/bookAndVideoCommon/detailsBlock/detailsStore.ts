import { create } from 'zustand'

export const detailsStoreValues: DetailsStoreValues = {
	viewType: 'CAN_CREATE',
	isMediaFreeToUse: false,
	sentenceId: null,
	sentenceText: null,
	bookName: null,
	bookAuthor: null,
	videoName: null,
	videoYear: null,
	translation: undefined,
	analysis: undefined,
	// sentenceTranslations: [],
	// sentenceTranslationsLoading: false,
	// wordIds: [],
	// selectWord: () => {},
}

export const useDetailsStore = create<DetailsStoreNext>()((set, get) => {
	return {
		...detailsStoreValues,
		updateStore: (storePart: Partial<DetailsStoreValues>) => {
			set(storePart)
		},
		/*setSentenceTranslations: (sentenceTranslations: SentenceTranslationLite[]) => {
			const lastTranslation = sentenceTranslations[sentenceTranslations.length - 1]

			set({
				sentenceTranslations,
				translation: lastTranslation?.translation ?? null,
				analysis: lastTranslation?.analysis ?? null,
			})
		},*/
		/*upsertSentenceTranslation: (sentenceTranslation: SentenceTranslationLite) => {
			const nextSentenceTranslations = upsertSentenceTranslation(get().sentenceTranslations, sentenceTranslation)
			const lastTranslation = nextSentenceTranslations[nextSentenceTranslations.length - 1]

			set({
				sentenceTranslations: nextSentenceTranslations,
				translation: lastTranslation?.translation ?? null,
				analysis: lastTranslation?.analysis ?? null,
			})
		},*/
	}
})

export type DetailsStoreNext = DetailsStoreValues & DetailsStoreMethods

export type DetailsStoreViewType =
	| 'CAN_CREATE'
	| 'LOGIN_REQUIRED'
	| 'SUBSCRIPTION_REQUIRED'
	| 'BALANCE_REQUIRED'
	| 'VIEW_FULL'
	| 'VIEW_PREVIEW'

/*export type SentenceTranslationLite = {
	id: number
	sentenceId: number
	translation: string
	analysis: null | string
	createdAt: string
}*/

export type DetailsStoreValues = {
	viewType: DetailsStoreViewType
	isMediaFreeToUse: boolean
	sentenceId: null | number
	sentenceText: null | string
	bookName: null | string
	bookAuthor: null | string
	videoName: null | string
	videoYear: null | string | number
	translation: undefined | null | string // undefined — неизвестно, null — нет перевода, string — есть перевод
	analysis: undefined | null | string
	// sentenceTranslations: SentenceTranslationLite[]
	// sentenceTranslationsLoading: boolean
	// wordIds: number[]
	// selectWord: (input: { sentenceId: number; wordId: number }) => void
}

export type DetailsStoreMethods = {
	updateStore: (store: Partial<DetailsStoreValues>) => void
	// setSentenceTranslations: (sentenceTranslations: SentenceTranslationLite[]) => void
	// upsertSentenceTranslation: (sentenceTranslation: SentenceTranslationLite) => void
}

/*function upsertSentenceTranslation(
	translations: SentenceTranslationLite[],
	sentenceTranslation: SentenceTranslationLite,
): SentenceTranslationLite[] {
	const index = translations.findIndex((t) => t.id === sentenceTranslation.id)
	if (index === -1) return [...translations, sentenceTranslation]

	const next = [...translations]
	next[index] = sentenceTranslation
	return next
}*/
