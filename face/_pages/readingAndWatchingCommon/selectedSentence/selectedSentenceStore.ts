import { create } from 'zustand'

export const selectedSentenceStoreValues: SelectedSentenceStoreValues = {
	sentenceId: 0,
	sentenceText: '',
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
	wordIds: number[]
	selectWord: (input: { sentenceId: number; wordId: number }) => void
}

export type SelectedSentenceStoreMethods = {
	updateStore: (store: Partial<SelectedSentenceStoreValues>) => void
}
