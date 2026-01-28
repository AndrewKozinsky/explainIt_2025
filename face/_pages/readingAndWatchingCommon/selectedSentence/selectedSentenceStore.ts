import { create } from 'zustand'

export const selectedSentenceStoreValues: SelectedSentenceStoreValues = {
	sentenceId: 0,
	sentenceText: '',
	translation: null,
	analysis: null,
	wordIds: [],
	selectWord: () => {},
}

export const useSelectedSentenceStore = create<SelectedSentenceStoreNext>()((set, get) => {
	return {
		...selectedSentenceStoreValues,
		updateStore: (storePart: Partial<SelectedSentenceStoreValues>) => {
			set(storePart)
		},
	}
})

export type SelectedSentenceStoreNext = SelectedSentenceStoreValues & SelectedSentenceStoreMethods

export type SelectedSentenceStoreValues = {
	sentenceId: number
	sentenceText: string
	translation: null | string
	analysis: null | string
	wordIds: number[]
	selectWord: (input: { sentenceId: number; wordId: number }) => void
}

export type SelectedSentenceStoreMethods = {
	updateStore: (store: Partial<SelectedSentenceStoreValues>) => void
}
