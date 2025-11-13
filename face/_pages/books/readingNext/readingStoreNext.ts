import { returnStatement } from '@babel/types'
import { ChapterTextStructurePopulated } from '_pages/books/commonLogic/chapterStructureTypes'
import { Book_Chapter_AnalysePhrase, BookChapterOutModel, BookChapterPhraseOutModel, BookOutModel } from '@/graphql'
import invariant from 'ts-invariant'
import { areArraysEqualIgnoringOrder } from 'utils/arrays'
import { create } from 'zustand'
import { produce } from 'immer'

export const readingStoreValues: ReadingStoreValues = {
	book: null as any as ReadingStore.BookData,
	chapter: null as any as ReadingStore.ChapterData,
	populatedChapter: null as any as ChapterTextStructurePopulated.Chapter,
	selection: {
		sentenceId: null,
		wordIds: [],
		phraseId: null,
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
					draftState.selection.sentenceId = id
					draftState.selection.wordIds = []
				})
			})
		},
		changeSelectedPhraseId(id: null | number) {
			set((baseState) => {
				return produce(baseState, (draftState) => {
					draftState.selection.phraseId = id
				})
			})
		},
		clearSelectedSentence() {
			set((baseState) => {
				return produce(baseState, (draftState) => {
					draftState.selection = {
						sentenceId: null,
						wordIds: [],
						phraseId: null,
					}
				})
			})
		},
		getSelectedSentence() {
			const { populatedChapter, selection } = get()
			if (selection.sentenceId == null) return null

			const sentence = populatedChapter.parts.find((part) => part.id === selection.sentenceId)
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
						draftState.selection.wordIds = [wordId]
					} else {
						draftState.selection.wordIds.push(wordId)
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
		/** Ищет фразу с типом idle у выделенного предложения и ставит ей тип loading.*/
		createLoadingPhraseInSelectedSentenceFromSelectedWords() {
			set((baseState) => {
				return produce(baseState, (draftState) => {
					const { sentenceId } = draftState.selection
					if (sentenceId == null) return

					const selectedSentence = draftState.populatedChapter.parts.find((part) => part.id === sentenceId)
					if (!selectedSentence || selectedSentence.type !== 'sentence') return

					const phraseWithTheseWords = selectedSentence.phrases.find((phrase) =>
						areArraysEqualIgnoringOrder(phrase.wordIds, draftState.selection.wordIds),
					)
					if (phraseWithTheseWords) return

					const maxPhraseId = selectedSentence.phrases.reduce((max, phrase) => Math.max(max, phrase.id), 0)

					selectedSentence.phrases.push({
						id: maxPhraseId + 1,
						type: 'loading',
						wordIds: [...draftState.selection.wordIds],
					})
				})
			})
		},
		/** В предложени ищет фразу с указанным id и ставит ей тип error*/
		turnPhraseIntoErrorPhrase(sentenceId: number, phraseId: number, errorMessage: string) {
			set((baseState) => {
				return produce(baseState, (draftState) => {
					const sentence = draftState.populatedChapter.parts.find((part) => part.id === sentenceId)
					if (!sentence || sentence.type !== 'sentence') return

					const phraseIdx = sentence.phrases.findIndex((phrase) => phrase.id === phraseId)
					if (phraseIdx < 0) return

					sentence.phrases[phraseIdx] = {
						type: 'error',
						id: phraseId,
						errorMessage,
						wordIds: [...sentence.phrases[phraseIdx].wordIds],
					}
				})
			})
		},
		setPhraseAnalysisIntoSentence(analysis: BookChapterPhraseOutModel) {
			set((baseState) => {
				return produce(baseState, (draftState) => {
					const sentence = draftState.populatedChapter.parts.find((sentence) => {
						const sentenceId = analysis.sentenceId
						return sentence.id === sentenceId
					})
					if (!sentence || sentence.type !== 'sentence') {
						return draftState
					}

					const phraseWithTheSameIdx = sentence.phrases.findIndex((phrase) => {
						return areArraysEqualIgnoringOrder(phrase.wordIds, analysis.phraseWordsIdx)
					})
					if (phraseWithTheSameIdx < 0) {
						return draftState
					}

					const maxPhraseId = sentence.phrases.reduce((max, phrase) => Math.max(max, phrase.id), 0)

					sentence.phrases[phraseWithTheSameIdx] = {
						id: maxPhraseId + 1,
						type: 'success',
						phraseIdInDb: analysis.id,
						phrase: analysis.phrase,
						// Идентификаторы выделенных слов этой фразы
						wordIds: analysis.phraseWordsIdx,
						analysis: {
							// Краткий перевод фразы
							translation: analysis.translation,
							// Анализ фразы
							analysis: analysis.analysis,
							// Примеры использования фразы (предложение на иностранном языке и родном)
							examples: analysis.examples.map((example) => {
								return {
									id: example.id,
									foreignLang: example.sentence,
									nativeLang: example.translation,
								}
							}),
						},
					}
				})
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
	selection: SelectedSentence
	// Если этот режим включен, то при нажатии на слово оно будет добавляться во фразу типа idle.
	// Если выключен, то заменит все слова поставленные во фразу типа idle.
	isWordsAddingModeEnabled: boolean
	deviceType: DeviceType
}

export type SelectedSentence = {
	sentenceId: null | number
	// Идентификаторы выделенных слов
	wordIds: number[]
	// Идентификатор фразы, анализ которой хочет видеть пользователь
	phraseId: number | null
}

export type ReadingStoreMethods = {
	updateBook: (book: ReadingStore.BookData) => void
	updateChapter: (chapter: ReadingStore.ChapterData) => void
	updatePopulatedChapter: (populatedChapter: ChapterTextStructurePopulated.Chapter) => void
	changeSelectedSentenceId: (id: number) => void
	changeSelectedPhraseId: (id: null | number) => void
	clearSelectedSentence: () => void
	getSelectedSentence: () => ChapterTextStructurePopulated.Sentence | null
	getSentenceById: (id: number) => ChapterTextStructurePopulated.Sentence | null
	// addWordInIdlePhraseInSelectedSentence: (wordId: number, insertType: 'add' | 'replaceAll') => void
	addWordToSelectedSentence: (wordId: number, insertType: 'add' | 'replaceAll') => void
	changeWordsAddingMode: (isEnabled: boolean) => void
	changeDeviceType: (deviceType: DeviceType) => void
	createLoadingPhraseInSelectedSentenceFromSelectedWords: () => void
	turnPhraseIntoErrorPhrase: (sentenceId: number, phraseId: number, errorMessage: string) => void
	setPhraseAnalysisIntoSentence: (analysis: BookChapterPhraseOutModel) => void
}
