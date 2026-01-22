// Тип данных для структуры текста приходящий с сервера
export namespace ResolvedTextStructure {
	export type Structure = {
		type: 'plainText'
		sentences: Sentence[]
	}

	export type Sentence = {
		// Sentence
		s: string
		// Translation
		t?: string
	}
}
