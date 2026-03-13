// import { create } from 'zustand'
// import { BookChapterOutModel, BookPrivateOutModel, BookPublicOutModel } from '@/graphql'

/*export const readingStoreValues: ReadingStoreValues = {
	book: null as any as ReadingStore.BookData,
	chapter: null as any as ReadingStore.ChapterData,
	populatedChapter: null as any as ChapterTextStructurePopulated.Chapter,
	selection: {
		sentenceId: null,
		wordIds: [],
	},
}*/

/*export const useReadingStore = create<ReadingStoreNext>()((set, get) => {
	return {
		...readingStoreValues,
		clearStoreData: () => {
			set(readingStoreValues)
		},
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
		selectWord(input: { sentenceId: number; wordId: number }) {
			set((state) => {
				return {
					selection: {
						sentenceId: input.sentenceId,
						wordIds: [input.wordId],
					},
				}
			})
		},
	}
})*/

/*export namespace ReadingStore {
	export type BookData = {
		loading: boolean
		errorMessage: null | string
		data: BookPrivateOutModel | BookPublicOutModel
		type: 'public' | 'private'
	}
	export type ChapterData = {
		loading: boolean
		errorMessage: null | string
		data: BookChapterOutModel
	}
}*/

// export type ReadingStoreNext = ReadingStoreValues & ReadingStoreMethods

/*export type ReadingStoreValues = {
	book: ReadingStore.BookData
	chapter: ReadingStore.ChapterData
	populatedChapter: ChapterTextStructurePopulated.Chapter
	// Данные выделенного предложения и слов
	selection: SelectedSentence
}*/

/*export type SelectedSentence = {
	sentenceId: null | number
	// Идентификаторы выделенных слов
	wordIds: number[]
}*/

/*export type ReadingStoreMethods = {
	clearStoreData: () => void
	updateBook: (book: ReadingStore.BookData) => void
	updateChapter: (chapter: ReadingStore.ChapterData) => void
	updatePopulatedChapter: (populatedChapter: ChapterTextStructurePopulated.Chapter) => void
	selectWord: (input: { sentenceId: number; wordId: number }) => void
}*/

// Тип данных для структуры текста наполненный дополнительными сведениями (используется на клиенте)
/*export namespace ChapterTextStructurePopulated {
	// Надо бы добавить сюда идентификатор статьи. Требуется при запросах на анализ.
	export type Chapter = {
		id: number
		header: null | string
		name: null | string
		sentences: Sentence[]
	}

	export type Sentence = {
		id: number
		sentence: string
	}
}*/
