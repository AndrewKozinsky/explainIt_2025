// Тип данных для структуры текста приходящий с сервера
export namespace ChapterTextStructure {
	export type Chapter = (Sentence | Space | CarriageReturn | Punctuation)[]

	export type Sentence = {
		t: 'sentence'
		translation: null | string
		// Составные части предложения
		parts: SentencePart[]
		// Соответствия между идентификаторами слов в предложении и идентификаторами фраз в базе данных с анализом фразы
		phrasesMapping?: { wordIds: number[]; phraseIdInDb: number }[]
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

	export type Phrase = {
		id: number
		sentenceId: number
		sentence: string
		phrase: string
		phraseWordsIdx: number[]
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

// Тип данных для структуры текста наполненный дополнительными сведениями (используется на клиенте)
export namespace ChapterTextStructurePopulated {
	// Надо бы добавить сюда идентификатор статьи. Требуется при запросах на анализ.
	export type Chapter = {
		id: number
		header: null | string
		name: null | string
		parts: Part[]
	}

	export type Part = Sentence | Space | CarriageReturn | Punctuation

	export type Sentence = {
		id: number
		type: 'sentence'
		context: string
		translation: null | string
		parts: SentencePart[]
		phrases: Phrase[]
	}

	export type SentencePart = Word | Space | Punctuation | CarriageReturn

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

	type CarriageReturn = {
		id: number
		type: 'carriageReturn'
	}

	export type Phrase = LoadingPhrase | ErrorPhrase | SuccessPhrase

	export type LoadingPhrase = {
		id: number
		type: 'loading'
		wordIds: number[]
	}

	export type ErrorPhrase = {
		id: number
		type: 'error'
		wordIds: number[]
		errorMessage: string
	}

	export type SuccessPhrase = {
		id: number
		type: 'success'
		phraseIdInDb: number
		phrase: string
		// Идентификаторы выделенных слов этой фразы
		wordIds: number[]
		analysis: {
			// Краткий перевод фразы
			translation: string
			// Анализ фразы
			analysis: string
			// Примеры использования фразы (предложение на иностранном языке и родном)
			examples: {
				id: number
				foreignLang: string
				nativeLang: string
			}[]
		}
	}
}
