export namespace ChapterTextStructure {
	export type Chapter = (Sentence | SentenceSpacePart | SentenceCarriageReturnPart | SentencePunctuationPart)[]

	type Sentence = {
		id: number
		type: 'sentence'
		translatedSentence: null | string
		sentenceParts: SentencePart[]
	}

	export type SentencePart =
		| SentenceWordPart
		| SentenceSpacePart
		| SentencePunctuationPart
		| SentenceCarriageReturnPart

	type SentenceWordPart = {
		id: number
		type: 'word'
		value: string
	}

	type SentenceSpacePart = {
		id: number
		type: 'space'
	}

	type SentencePunctuationPart = {
		id: number
		type: 'punctuation'
		value: string
	}

	type SentenceCarriageReturnPart = {
		id: number
		type: 'carriageReturn'
	}
}
