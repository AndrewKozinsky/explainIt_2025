export namespace PopulatedTextStructure {
	export type Structure = {
		sentences: Sentence[]
		// selected: Selected
	}

	export type Sentence = {
		id: number
		// Sentence
		text: string
		// Translation
		// translation?: string
	}

	/*export type Selected = {
		sentenceId: null | number
		wordIds: number[]
	}*/
}
