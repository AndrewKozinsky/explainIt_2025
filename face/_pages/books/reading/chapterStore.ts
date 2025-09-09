import { create } from 'zustand'

export const chapterStoreValues: ChapterStoreValues = {
	selectedSentence: null as any as Sentence,
}

export const useChapterStore = create<UserStore>()((set) => {
	return {
		...chapterStoreValues,
		selectSingleWord: (wordId: number) =>
			set((state) => {
				const sentence = state.selectedSentence
				if (!sentence) return state
				return {
					selectedSentence: {
						...sentence,
						selectedWordIds: [wordId],
					},
				}
			}),
		addWordToSelection: (wordId: number) =>
			set((state) => {
				const sentence = state.selectedSentence
				if (!sentence) return state
				const alreadySelected = sentence.selectedWordIds.includes(wordId)
				if (alreadySelected) return state
				return {
					selectedSentence: {
						...sentence,
						selectedWordIds: [...sentence.selectedWordIds, wordId],
					},
				}
			}),
	}
})

export type ChapterStoreValues = {
	// Данные выделенного предложения
	selectedSentence: Sentence
}

export type UserStore = ChapterStoreValues & {
	// Заменяет выбор одним словом
	selectSingleWord: (wordId: number) => void
	// Добавляет слово к выбору, если его ещё нет
	addWordToSelection: (wordId: number) => void
}

export type Sentence = {
	// Части выделенного предложения
	sentenceParts: SentencePart[]
	// Перевод выделенного предложения
	sentenceTranslation: null | string
	// Уже переведённые и разобранные фразы
	translatedPhrases: Phrase[]
	// Выделенные слова, которые хотят перевести и разобрать
	selectedWordIds: number[]
}

type SentencePart = SentenceWordPart | SentencePunctuationPart

type SentenceWordPart = {
	id: number
	type: 'word'
	value: string
}

type SentencePunctuationPart = {
	id: number
	type: 'punctuation'
	value: string
}

type Phrase = {
	id: number
	wordIds: number[]
}
