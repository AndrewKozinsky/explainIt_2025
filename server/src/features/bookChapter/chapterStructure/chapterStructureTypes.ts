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
