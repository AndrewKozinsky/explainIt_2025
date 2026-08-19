import { create } from 'zustand'

type BaseMediaStore = {
	selectedSentenceId: null | number
	selectedWordId: null | number
	selectWord: (input: { sentenceId: number; wordId: number }) => void
}

export function createBaseMediaStore() {
	return create<BaseMediaStore>((set) => ({
		selectedSentenceId: null,
		selectedWordId: null,
		selectWord: ({ sentenceId, wordId }) =>
			set((state) => {
				return {
					selectedSentenceId: sentenceId,
					selectedWordId: wordId,
				}
			}),
	}))
}
