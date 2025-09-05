import { create } from 'zustand'

export const chapterStoreValues: ChapterStoreValues = {
	sentence: null as any as Sentence,
}

export const useChapterStore = create<UserStore>()((set) => {
	return {
		...chapterStoreValues,
	}
})

export type ChapterStoreValues = {
	sentence: Sentence
}

export type UserStore = ChapterStoreValues

export type Sentence = {
	parts: SentencePart[]
	phrases: Phrase[]
	currentPhraseId: number
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
