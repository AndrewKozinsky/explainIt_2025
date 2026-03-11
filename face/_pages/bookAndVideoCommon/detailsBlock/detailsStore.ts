// import { create } from 'zustand'

/*export const detailsStoreValues: DetailsStoreValues = {
	bookName: null,
	bookAuthor: null,
	videoName: null,
	videoYear: null,
	viewType: 'CAN_CREATE',
	isPublicMedia: false,
	isMediaFreeToUse: false,
	sentenceId: null,
	wordIds: [],
	sentenceText: null,
	sentenceAnalysisLoading: false,
	sentenceAnalysisError: null,
	analysisExistStatus: 'UNKNOWN',
	sentenceTranslation: null,
	sentenceAnalysis: null,
	selectWord: () => {},
}*/

/*export const useDetailsStore = create<DetailsStoreNext>()((set, get) => {
	return {
		...detailsStoreValues,
		updateStore: (storePart: Partial<DetailsStoreValues>) => {
			set(storePart)
		},
		upsertSentenceTranslation: (sentenceTranslation: SentenceTranslationLite) => {
			set({
				sentenceTranslation: sentenceTranslation?.translation ?? null,
				sentenceAnalysis: sentenceTranslation?.analysis ?? null,
			})
		},
	}
})*/

// export type DetailsStoreNext = DetailsStoreValues & DetailsStoreMethods

/*export type DetailsStoreViewType =
	| 'CAN_CREATE'
	| 'LOGIN_REQUIRED'
	| 'VIEW_FULL'
	| 'LOGIN_AND_SUBSCRIPTION_REQUIRED'
	| 'SUBSCRIPTION_REQUIRED'
	| 'BALANCE_REQUIRED'*/

/*export type SentenceTranslationLite = {
	translation: string
	analysis: null | string
}*/

/*export type DetailsStoreValues = {
	bookName: null | string
	bookAuthor: null | string
	videoName: null | string
	videoYear: null | string | number
	// Какой экран показывать на панели деталей
	viewType: DetailsStoreViewType
	// Является ли медиа публичным (public book/video)
	isPublicMedia: boolean
	// Может ли пользователь без подписки переводить текст
	isMediaFreeToUse: boolean
	// Идентификатор выбранного предложения
	sentenceId: null | number
	// Идентификаторы выбранных слов
	wordIds: number[]
	// Текст выбранного предложения
	sentenceText: null | string
	// Идёт ли загрузка анализа предложения
	sentenceAnalysisLoading: boolean
	// Ошибка при загрузке анализа предложения
	sentenceAnalysisError: null | string
	// Статус существования перевода
	analysisExistStatus: 'EXISTS' | 'NOT_EXISTS' | 'UNKNOWN'
	// Полученные варианты анализа предложения
	sentenceTranslation: string | null
	sentenceAnalysis: string | null
	selectWord: (input: { sentenceId: number; wordId: number }) => void
}*/

/*export type DetailsStoreMethods = {
	updateStore: (store: Partial<DetailsStoreValues>) => void
	upsertSentenceTranslation: (sentenceTranslation: SentenceTranslationLite) => void
}*/
