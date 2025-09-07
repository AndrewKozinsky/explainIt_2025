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
	status: PhraseStatus
}

export enum PhraseStatus {
	// Пользователь указывает слова для разбора (одно или несколько).
	collectingWords = 'collectingWords',
	// Слова выбраны и нажата кнопка начала разбора.
	loadingAnalysis = 'loadingAnalysis',
	// Во время разбора произошла ошибка.
	errorAnalysis = 'errorAnalysis',
	// Разбор выделенных слов завершен и ответ получен.
	readyAnalysis = 'readyAnalysis',
}
