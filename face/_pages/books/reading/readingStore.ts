import { ChapterTextStructureFull } from '_pages/books/chapterStructureTypes'
import { create } from 'zustand'

export const readingStoreValues: ReadingStoreValues = {
	bookAuthor: null,
	bookName: null,
	chapterId: null,
	chapter: null as any as ChapterTextStructureFull.Chapter,
	sentence: {
		context: '',
		sentenceId: null,
		sentence: null as any as ChapterTextStructureFull.SentencePart[],
		sentenceTranslation: null,
		selectedWordIds: [],
		fetchTranslation: {
			isLoading: false,
			error: null,
		},
		translatedPhrases: [],
	},
}

export const useReadingStore = create<ReadingStore>()((set) => {
	return {
		...readingStoreValues,
		updateSentence(sentence: Partial<Sentence>) {
			set((state) => {
				return {
					sentence: {
						...state.sentence,
						...sentence,
					},
				}
			})
		},
		selectSingleWord: (wordId: number) =>
			set((state) => {
				const sentence = state.sentence
				if (!sentence) return state
				return {
					sentence: {
						...sentence,
						selectedWordIds: [wordId],
					},
				}
			}),
		addWordToSelection: (wordId: number) =>
			set((state) => {
				const sentence = state.sentence
				if (!sentence) return state
				const alreadySelected = sentence.selectedWordIds.includes(wordId)
				if (alreadySelected) return state
				return {
					sentence: {
						...sentence,
						selectedWordIds: [...sentence.selectedWordIds, wordId],
					},
				}
			}),
	}
})

export type ReadingStore = ReadingStoreValues & ReadingStoreMethods

export type ReadingStoreValues = {
	// Автор книги
	bookAuthor: null | string
	// Название книги
	bookName: null | string
	chapterId: null | number
	chapter: ChapterTextStructureFull.Chapter
	// Данные выделенного предложения
	sentence: Sentence
	// Возможно сюда же следует записать сам текст предложения...
	// И ещё настройки отображения главы...
}

export type ReadingStoreMethods = {
	updateSentence: (sentence: Partial<Sentence>) => void
	// Заменяет выбор одним словом
	selectSingleWord: (wordId: number) => void
	// Добавляет слово к выбору, если его ещё нет
	addWordToSelection: (wordId: number) => void
}

export type Sentence = {
	// Текст из нескольких предложений до выделенного и несколько после чтобы ИИ понимал контекст
	context: string
	// Идентификатор выделенного предложения
	sentenceId: null | number
	// Выделенное предложение
	sentence: ChapterTextStructureFull.SentencePart[]
	// Перевод выделенного предложения
	sentenceTranslation: null | string
	// Выделенные слова, которые хотят перевести и разобрать
	selectedWordIds: number[]
	// Данные о загрузке анализа фразы
	fetchTranslation: {
		isLoading: boolean
		error: null | string
	}
	// Уже переведённые и разобранные фразы
	translatedPhrases: Phrase[]
}

type Phrase = {
	id: number
	wordIds: number[]
}
