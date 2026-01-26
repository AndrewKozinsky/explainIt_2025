// Тип данных для структуры текста приходящий с сервера
/*export namespace ChapterTextStructure {
	export type Chapter = Sentence[]

	export type Sentence = {
		// sentence
		t: 'sn'
		// translation
		tr: null | string
		// Составные части предложения
		p: SentencePart[]
	}

	export type SentencePart = Word | Space | Punctuation

	type Word = {
		// word
		t: 'w'
		v: string
	}

	type Space = {
		// space
		t: 's'
	}

	type Punctuation = {
		// punctuation
		t: 'pn'
		// value
		v: string
	}
}*/

// Тип данных для структуры текста наполненный дополнительными сведениями (используется на клиенте)
export namespace ChapterTextStructurePopulated {
	// Надо бы добавить сюда идентификатор статьи. Требуется при запросах на анализ.
	export type Chapter = {
		id: number
		header: null | string
		name: null | string
		sentences: Sentence[]
	}

	export type Sentence = {
		id: number
		sentence: string
	}
}
