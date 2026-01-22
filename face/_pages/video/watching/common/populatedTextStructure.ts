export namespace PopulatedTextStructure {
	export type Structure = {
		sentences: Sentence[]
		selected: Selected
	}

	export type Sentence = {
		id: number
		// Sentence
		parts: SentencePart[]
		// Translation
		translation?: string
	}

	export type SentencePart = Word | Space | Punctuation

	export type Word = {
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

	export type Selected = {
		sentenceId: null | number
		wordIds: number[]
	}
}
