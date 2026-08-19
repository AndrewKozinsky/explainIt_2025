import { create } from 'zustand'

export type InfoViewType = 'words' | 'ai_dialog' | 'dictionary'

type DetailsStore = {
	currentInfoView: InfoViewType
	setActiveInfoView: (view: InfoViewType) => void
}

/** Локальное UI-состояние правой панели. Данные переводов находятся в media store. */
export const useDetailsStore = create<DetailsStore>()((set) => ({
	currentInfoView: 'dictionary',
	setActiveInfoView: (currentInfoView) => set({ currentInfoView }),
}))
