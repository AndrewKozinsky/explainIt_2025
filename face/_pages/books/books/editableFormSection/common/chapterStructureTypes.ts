export namespace ChapterTextStructure {
	export type Chapter = (Sentence | Space | CarriageReturn | Punctuation)[]

	type Sentence = {
		t: 'sentence'
		translate: null | string
		parts: SentencePart[]
	}

	export type SentencePart = Word | Space | Punctuation | CarriageReturn

	type Word = {
		t: 'word'
		v: string
	}

	type Space = {
		t: 'space'
	}

	type Punctuation = {
		t: 'punctuation'
		v: string
	}

	type CarriageReturn = {
		t: 'carriageReturn'
	}
}

export namespace ChapterTextStructureFull {
	export type Chapter = (Sentence | Space | CarriageReturn | Punctuation)[]

	type Sentence = {
		id: number
		type: 'sentence'
		translatedSentence: null | string
		sentenceParts: SentencePart[]
	}

	export type SentencePart = Word | Space | Punctuation | CarriageReturn

	type Word = {
		id: number
		type: 'word'
		value: string
	}

	type Space = {
		id: number
		type: 'space'
	}

	type Punctuation = {
		id: number
		type: 'punctuation'
		value: string
	}

	type CarriageReturn = {
		id: number
		type: 'carriageReturn'
	}
}
