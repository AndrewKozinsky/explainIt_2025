import { create } from 'zustand'

/**
 * Слова, которые последними отправлены в Словарь по клику. Выбор один на всю страницу: клик по слову в другом тексте
 * снимает заливку с прежнего слова или выражения.
 *
 * - `ownerId` — id экземпляра SegmentedText, в котором нажали слово;
 * - `selectedStarts` — начала выбранных слов в тексте этого экземпляра. Запоминаются в момент клика, как и фраза для
 *   Словаря, поэтому позднее обновление карты слов выбор не меняет.
 */
type SelectedWordsStore = {
	ownerId: null | string
	selectedStarts: null | Set<number>
	selectWords: (ownerId: string, selectedStarts: Set<number>) => void
	clearSelectedWords: () => void
}

export const useSelectedWordsStore = create<SelectedWordsStore>()((set) => ({
	ownerId: null,
	selectedStarts: null,

	selectWords: (ownerId, selectedStarts) => set({ ownerId, selectedStarts }),

	clearSelectedWords: () => set({ ownerId: null, selectedStarts: null }),
}))
