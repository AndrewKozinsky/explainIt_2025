// import { ChapterTextStructurePopulated } from '_pages/books/commonLogic/chapterStructureTypes'
// import { BookChapter_AnalyseSentenceAndPhrase, BookChapterOutModel, BookOutModel } from '@/graphql'
// import { areArraysEqualIgnoringOrder } from 'utils/arrays'
// import { create } from 'zustand'
// import { produce } from 'immer'

/*export const readingStoreValues: ReadingStoreValues = {
	book: null as any as ReadingStore.BookData,
	chapter: null as any as ReadingStore.ChapterData,
	populatedChapter: null as any as ChapterTextStructurePopulated.Chapter,
	selectedSentence: {
		context: '',
		sentenceId: null,
	},
}*/

/*export const useReadingStore = create<ReadingStore>()((set, get) => {
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
		changeSelectedSentence(context: string, sentenceId: number) {
			set((state) => {
				return {
					selectedSentence: {
						context,
						sentenceId,
					},
				}
			})
		},
		clearSelectedSentence() {
			set((state) => {
				return {
					selectedSentence: {
						context: '',
						sentenceId: null,
					},
				}
			})
		},
		/!**
		 * Когда выделено какое-либо предложение и пользователь выделяет слова, то их идентификаторы попадают в массив phrases с типом idle.
		 * Такой тип фразы может быть только один. Если пользователь делает запрос на анализ, то он становится в тип loading.
		 * @param wordId — id слова, которое нужно поставить во фразу ожидающую перевода
		 * @param insertType — тип вставки:
		 * add — добавить слово в существующие слова фразы,
		 * replaceAll — убрать все остальные идентификаторы слов заменив этим
		 *!/
		addWordInIdlePhraseInSelectedSentence(wordId: number, insertType: 'add' | 'replaceAll') {
			const selectedSentenceId = get().selectedSentence.sentenceId
			if (!selectedSentenceId) return

			get().addWordInIdlePhraseInSentence(selectedSentenceId, wordId, insertType)
		},
		/!**
		 * Добавляет в фразу типа 'idle' слово с указанным идентификатором.
		 * @param sentenceId — в каком предложении добавлять слово в фразу с типом 'idle'
		 * @param wordId — id слова, которое нужно поставить во фразу
		 * @param insertType — тип вставки:
		 * add — добавить слово в существующие слова фразы,
		 * replaceAll — убрать все остальные идентификаторы слов заменив этим
		 *!/
		addWordInIdlePhraseInSentence(sentenceId: number, wordId: number, insertType: 'add' | 'replaceAll') {
			set((baseState) => {
				return produce(baseState, (draftState) => {
					const sentence = draftState.populatedChapter.parts.find((sentence) => {
						return sentence.id === sentenceId
					})
					if (!sentence || sentence.type !== 'sentence') {
						return
					}

					const idlePhraseIdx = sentence.phrases.findIndex((phrase) => {
						return phrase.type === 'idle'
					})

					if (idlePhraseIdx >= 0) {
						if (insertType === 'replaceAll') {
							sentence.phrases[idlePhraseIdx].wordIds = [wordId]
						} else if (insertType === 'add') {
							sentence.phrases[idlePhraseIdx].wordIds.push(wordId)
						}
					} else {
						sentence.phrases.push({
							type: 'idle',
							wordIds: [wordId],
						})
					}
				})
			})
		},
		/!** Ищет фразу с типом idle у выделенного предложения и ставит ей тип loading.*!/
		turnPhraseIntoLoadingInSelectedSentence(wordIds: number[]) {
			set((baseState) => {
				return produce(baseState, (draftState) => {
					const selectedSentenceId = baseState.selectedSentence.sentenceId

					const selectedSentence = draftState.populatedChapter.parts.find((sentence) => {
						return sentence.id === selectedSentenceId
					})
					if (!selectedSentence || selectedSentence.type !== 'sentence') {
						return draftState
					}

					const phraseIdx = selectedSentence.phrases.findIndex((phrase) => {
						return areArraysEqualIgnoringOrder(phrase.wordIds, wordIds)
					})
					if (phraseIdx < 0) return draftState

					selectedSentence.phrases[phraseIdx].type = 'loading'
				})
			})
		},
		/!** Ищет фразу с переданными идентификаторам слов и делает её ошибочный *!/
		turnPhraseIntoErrorPhraseInSelectedSentence(wordIds: number[], errorMessage: string) {
			set((baseState) => {
				return produce(baseState, (draftState) => {
					const selectedSentenceId = baseState.selectedSentence.sentenceId

					const selectedSentence = draftState.populatedChapter.parts.find((sentence) => {
						return sentence.id === selectedSentenceId
					})
					if (!selectedSentence || selectedSentence.type !== 'sentence') {
						return draftState
					}

					const phraseWithTheSameIds = selectedSentence.phrases.findIndex((phrase) => {
						return areArraysEqualIgnoringOrder(phrase.wordIds, wordIds)
					})

					if (phraseWithTheSameIds < 0) {
						return draftState
					}

					selectedSentence.phrases[phraseWithTheSameIds] = {
						type: 'error',
						wordIds: selectedSentence.phrases[phraseWithTheSameIds].wordIds,
						errorMessage,
					} as ChapterTextStructurePopulated.ErrorPhrase
				})
			})
		},
		/!** Ищет фразу с переданными идентификаторам слов и делает её ошибочный *!/
		setSentenceTranslation(sentenceId: number, sentenceTranslation: string) {
			set((baseState) => {
				return produce(baseState, (draftState) => {
					const sentence = draftState.populatedChapter.parts.find((sentence) => {
						return sentence.id === sentenceId
					})
					if (!sentence || sentence.type !== 'sentence') {
						return draftState
					}

					if (!sentence.translation) {
						sentence.translation = sentenceTranslation
					}
				})
			})
		},
		/!** ??? *!/
		setPhraseAnalysisIntoSentence(analysisData: BookChapter_AnalyseSentenceAndPhrase) {
			set((baseState) => {
				return produce(baseState, (draftState) => {
					const analysis = analysisData.book_chapter_AnalyseSentenceAndPhrase

					const sentence = draftState.populatedChapter.parts.find((sentence) => {
						const sentenceId = analysis.phrase.sentenceId
						return sentence.id === sentenceId
					})
					if (!sentence || sentence.type !== 'sentence') {
						return draftState
					}

					const phraseWithTheSameIdx = sentence.phrases.findIndex((phrase) => {
						return areArraysEqualIgnoringOrder(phrase.wordIds, analysis.phrase.phraseWordsIdx)
					})
					if (phraseWithTheSameIdx < 0) {
						return draftState
					}

					sentence.phrases[phraseWithTheSameIdx] = {
						type: 'success',
						phraseIdInDb: analysis.phrase.id,
						phrase: analysis.phrase.phrase,
						// Идентификаторы выделенных слов этой фразы
						wordIds: analysis.phrase.phraseWordsIdx,
						analysis: {
							// Краткий перевод фразы
							translation: analysis.phrase.translation,
							// Анализ фразы
							analysis: analysis.phrase.analysis,
							// Примеры использования фразы (предложение на иностранном языке и родном)
							examples: analysis.phrase.examples.map((example) => {
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
})*/

/*export namespace ReadingStore {
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
}*/

// export type ReadingStore = ReadingStoreValues & ReadingStoreMethods

/*export type ReadingStoreValues = {
	book: ReadingStore.BookData
	chapter: ReadingStore.ChapterData
	populatedChapter: ChapterTextStructurePopulated.Chapter
	// Данные выделенного предложения
	selectedSentence: SelectedSentence
	// Возможно сюда же следует записать сам текст предложения...
	// И ещё настройки отображения главы...
}*/

/*export type ReadingStoreMethods = {
	updateBook: (book: ReadingStore.BookData) => void
	updateChapter: (chapter: ReadingStore.ChapterData) => void
	updatePopulatedChapter: (populatedChapter: ChapterTextStructurePopulated.Chapter) => void
	changeSelectedSentence: (context: string, sentenceId: number) => void
	clearSelectedSentence: () => void
	addWordInIdlePhraseInSelectedSentence: (wordId: number, insertType: 'add' | 'replaceAll') => void
	addWordInIdlePhraseInSentence: (sentenceId: number, wordId: number, insertType: 'add' | 'replaceAll') => void
	turnPhraseIntoLoadingInSelectedSentence: (wordIds: number[]) => void
	turnPhraseIntoErrorPhraseInSelectedSentence: (wordIds: number[], errorMessage: string) => void
	setSentenceTranslation: (sentenceId: number, sentenceTranslation: string) => void
	setPhraseAnalysisIntoSentence: (analysisData: BookChapter_AnalyseSentenceAndPhrase) => void
}*/

/*export type SelectedSentence = {
	// Текст из нескольких предложений до выделенного и несколько после чтобы ИИ понимал контекст
	context: string
	// Идентификатор выделенного предложения
	sentenceId: null | number
}*/
