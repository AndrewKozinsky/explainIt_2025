export namespace ChapterTextStructure {
	export type Chapter = Paragraph[]

	type Paragraph = Sentence[]

	type Sentence = {
		sentence: string
		translatedSentence: null | string
		sentenceParts: SentencePart[]
	}

	export type SentencePart = SentenceWordPart | SentencePunctuationPart

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
}
