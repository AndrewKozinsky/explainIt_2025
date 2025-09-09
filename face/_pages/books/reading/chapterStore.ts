import { create } from 'zustand'

export const chapterStoreValues: ChapterStoreValues = {
	selectedSentence: null as any as Sentence,
}

export const useChapterStore = create<UserStore>()((set) => {
	return {
		...chapterStoreValues,
	}
})

export type ChapterStoreValues = {
	// Данные выделенного предложения
	selectedSentence: Sentence
}

export type UserStore = ChapterStoreValues

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
