// Тип данных для структуры текста приходящий с сервера
export namespace ChapterTextStructure {
	export type Chapter = (Sentence | Space | CarriageReturn | Punctuation)[]

	export type Sentence = {
		// sentence
		t: 'sn'
		// translation
		tr: null | string
		// Составные части предложения
		p: SentencePart[]
	}

	export type SentencePart = Word | Space | Punctuation | CarriageReturn

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
		v: string
	}

	type CarriageReturn = {
		// carriage return
		t: 'cr'
	}

	export type Phrase = {
		id: number
		sentenceId: number
		sentence: string
		phrase: string
		phraseWordsIdx: number[]
		transcription: string
		translation: string
		analysis: string
		examples: PhraseExample[]
	}

	type PhraseExample = {
		id: number
		sentence: string
		translation: string
	}
}
