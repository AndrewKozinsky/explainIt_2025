import { ChapterTextStructurePopulated } from '_pages/books/commonLogic/chapterStructureTypes'
import { BookChapterOutModel, BookOutModel } from '@/graphql'
import { create } from 'zustand'
import { produce } from 'immer'

export const readingStoreValues: ReadingStoreValues = {
	book: null as any as ReadingStore.BookData,
	chapter: null as any as ReadingStore.ChapterData,
	populatedChapter: null as any as ChapterTextStructurePopulated.Chapter,
	selectedSentence: {
		id: null,
		wordIds: [],
	},
	isWordsAddingModeEnabled: false,
	deviceType: 'mouse',
}

export const useReadingStoreNext = create<ReadingStoreNext>()((set, get) => {
	return {
		...readingStoreValues,
		updateBook: (book: ReadingStore.BookData) => {
			set((state) => {
				return {
					book,
				}
			})
		},
		updateChapter: (chapter: ReadingStore.ChapterData) => {
			set((state) => {
				return {
					chapter,
				}
			})
		},
		updatePopulatedChapter: (populatedChapter: ChapterTextStructurePopulated.Chapter) => {
			set((state) => {
				return {
					populatedChapter,
				}
			})
		},
		changeSelectedSentenceId(id: number) {
			set((baseState) => {
				return produce(baseState, (draftState) => {
					draftState.selectedSentence.id = id
				})
			})
		},
		clearSelectedSentence() {
			set((baseState) => {
				return produce(baseState, (draftState) => {
					draftState.selectedSentence = {
						id: null,
						wordIds: [],
					}
				})
			})
		},
		getSelectedSentence() {
			const { populatedChapter, selectedSentence } = get()
			if (selectedSentence.id == null) return null

			const sentence = populatedChapter.parts.find((part) => part.id === selectedSentence.id)
			if (!sentence || sentence.type !== 'sentence') return null

			return sentence
		},
		getSentenceById(sentenceId: number) {
			const { populatedChapter } = get()

			const sentence = populatedChapter.parts.find((part) => part.id === sentenceId)
			if (!sentence || sentence.type !== 'sentence') return null

			return sentence
		},
		/**
		 * Добавляет в выделенное предложение идентификатор выделенного слова.
		 * @param wordId — id слова, которое нужно поставить во фразу
		 * @param insertType — тип вставки:
		 * add — добавить id слова с сохранением других идентификаторов в массиве выделенных слов,
		 * replaceAll — убрать все остальные идентификаторы слов заменив этим
		 */
		addWordToSelectedSentence(wordId: number, insertType: 'add' | 'replaceAll') {
			set((baseState) => {
				return produce(baseState, (draftState) => {
					if (insertType === 'replaceAll') {
						draftState.selectedSentence.wordIds = [wordId]
					} else {
						draftState.selectedSentence.wordIds.push(wordId)
					}
				})
			})
		},
		changeWordsAddingMode(isEnabled: boolean) {
			set((state) => {
				return {
					isWordsAddingModeEnabled: isEnabled,
				}
			})
		},
		changeDeviceType(deviceType: DeviceType) {
			set((state) => {
				return {
					deviceType,
				}
			})
		},
	}
})

export namespace ReadingStore {
	export type BookData = {
		loading: boolean
		errorMessage: null | string
		data: BookOutModel
	}
	export type ChapterData = {
		loading: boolean
		errorMessage: null | string
		data: BookChapterOutModel
	}
}

export type ReadingStoreNext = ReadingStoreValues & ReadingStoreMethods

type DeviceType = 'mouse' | 'touch'

export type ReadingStoreValues = {
	book: ReadingStore.BookData
	chapter: ReadingStore.ChapterData
	populatedChapter: ChapterTextStructurePopulated.Chapter
	// Данные выделенного предложения
	selectedSentence: SelectedSentence
	// Если этот режим включен, то при нажатии на слово оно будет добавляться во фразу типа idle.
	// Если выключен, то заменит все слова поставленные во фразу типа idle.
	isWordsAddingModeEnabled: boolean
	deviceType: DeviceType
}

export type SelectedSentence = {
	id: null | number
	wordIds: number[]
}

export type ReadingStoreMethods = {
	updateBook: (book: ReadingStore.BookData) => void
	updateChapter: (chapter: ReadingStore.ChapterData) => void
	updatePopulatedChapter: (populatedChapter: ChapterTextStructurePopulated.Chapter) => void
	changeSelectedSentenceId: (id: number) => void
	clearSelectedSentence: () => void
	getSelectedSentence: () => ChapterTextStructurePopulated.Sentence | null
	getSentenceById: (id: number) => ChapterTextStructurePopulated.Sentence | null
	// addWordInIdlePhraseInSelectedSentence: (wordId: number, insertType: 'add' | 'replaceAll') => void
	addWordToSelectedSentence: (wordId: number, insertType: 'add' | 'replaceAll') => void
	changeWordsAddingMode: (isEnabled: boolean) => void
	changeDeviceType: (deviceType: DeviceType) => void
	// turnPhraseIntoLoadingInSelectedSentence: (wordIds: number[]) => void
	// turnPhraseIntoErrorPhraseInSelectedSentence: (wordIds: number[], errorMessage: string) => void
	// setSentenceTranslation: (sentenceId: number, sentenceTranslation: string) => void
	// setPhraseAnalysisIntoSentence: (analysisData: BookChapter_AnalyseSentenceAndPhrase) => void
}
