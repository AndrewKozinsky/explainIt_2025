export namespace PopulatedTextStructure {
	export type Structure = {
		sentences: Sentence[]
	}

	export type Sentence = {
		id: number
		text: string
	}
}
