import { ChapterTextStructurePopulated } from '_pages/books/commonLogic/chapterStructureTypes'
import { BookChapterOutModel, BookOutModel } from 'graphql'
import { create } from 'zustand'
import { produce } from 'immer'

export const readingStoreValues: ReadingStoreValues = {
	book: {
		loading: true,
		errorMessage: null,
		data: null,
	},
	chapter: {
		loading: true,
		errorMessage: null,
		data: null,
	},
	populatedChapter: null as any as ChapterTextStructurePopulated.Chapter,
	selectedSentence: {
		context: '',
		sentenceId: null,
	},
}

export const useReadingStore = create<ReadingStore>()((set) => {
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
		updateSentence(context: string, sentenceId: number) {
			set((state) => {
				return {
					selectedSentence: {
						context,
						sentenceId,
					},
				}
			})
		},
		/**
		 * Когда выделено какое-либо предложение и пользователь выделяет слова, то их идентификаторы попадают в массив phrases с типом idle.
		 * Такой тип фразы может быть только один. Если пользователь делает запрос на анализ, то он становится в тип loading.
		 * @param wordId — id слова, которое нужно поставить в фразу ожидающую перевода
		 * @param insertType — тип вставки:
		 * add — добавить слово в существующие слова фразы,
		 * replace — убрать все остальные идентификаторы слов заменив этим
		 */
		addOrUpdateIdlePhraseInSelectedSentence(wordId: number, insertType: 'add' | 'replace') {
			set((baseState) => {
				return produce(baseState, (draftState) => {
					const selectedSentenceId = baseState.selectedSentence.sentenceId

					const selectedSentence = draftState.populatedChapter.find((sentence) => {
						return sentence.id === selectedSentenceId
					})
					if (!selectedSentence || selectedSentence.type !== 'sentence') {
						return draftState
					}

					const idlePhraseIdx = selectedSentence.phrases.findIndex((phrase) => {
						return phrase.type === 'idle'
					})

					if (idlePhraseIdx >= 0) {
						if (insertType === 'replace') {
							selectedSentence.phrases[idlePhraseIdx].wordIds = [wordId]
						} else if (insertType === 'add') {
							selectedSentence.phrases[idlePhraseIdx].wordIds.push(wordId)
						}
					} else {
						selectedSentence.phrases.push({
							type: 'idle',
							wordIds: [wordId],
						})
					}
				})
			})
		},
		/**
		 * Ищет фразу с типом idle у выделенного предложения и ставит ей тип loading.
		 */
		turnIdlePhraseIntoLoadingInSelectedSentence() {
			set((baseState) => {
				return produce(baseState, (draftState) => {
					const selectedSentenceId = baseState.selectedSentence.sentenceId

					const selectedSentence = draftState.populatedChapter.find((sentence) => {
						return sentence.id === selectedSentenceId
					})
					if (!selectedSentence || selectedSentence.type !== 'sentence') {
						return draftState
					}

					const idlePhraseIdx = selectedSentence.phrases.findIndex((phrase) => {
						return phrase.type === 'idle'
					})
					if (idlePhraseIdx < 0) {
						return draftState
					}

					selectedSentence.phrases[idlePhraseIdx].type = 'loading'
				})
			})
		},
	}
})

export namespace ReadingStore {
	export type BookData = {
		loading: boolean
		errorMessage: null | string
		data: null | BookOutModel
	}
	export type ChapterData = {
		loading: boolean
		errorMessage: null | string
		data: null | BookChapterOutModel
	}
}

export type ReadingStore = ReadingStoreValues & ReadingStoreMethods

export type ReadingStoreValues = {
	book: ReadingStore.BookData
	chapter: ReadingStore.ChapterData
	populatedChapter: ChapterTextStructurePopulated.Chapter
	// Данные выделенного предложения
	selectedSentence: SelectedSentence
	// Возможно сюда же следует записать сам текст предложения...
	// И ещё настройки отображения главы...
}

export type ReadingStoreMethods = {
	updateBook: (book: ReadingStore.BookData) => void
	updateChapter: (chapter: ReadingStore.ChapterData) => void
	updatePopulatedChapter: (populatedChapter: ChapterTextStructurePopulated.Chapter) => void
	updateSentence: (context: string, sentenceId: number) => void
	addOrUpdateIdlePhraseInSelectedSentence: (wordId: number, insertType: 'add' | 'replace') => void
	turnIdlePhraseIntoLoadingInSelectedSentence: () => void
}

export type SelectedSentence = {
	// Текст из нескольких предложений до выделенного и несколько после чтобы ИИ понимал контекст
	context: string
	// Идентификатор выделенного предложения
	sentenceId: null | number
}
