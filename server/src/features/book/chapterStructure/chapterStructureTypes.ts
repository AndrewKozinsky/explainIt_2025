// Тип данных для структуры текста приходящий с сервера
export namespace ChapterTextStructure {
	export type Chapter = (Sentence | Space | CarriageReturn | Punctuation)[]

	export type Sentence = {
		t: 'sentence'
		translation: null | string
		// Составные части предложения
		parts: SentencePart[]
		// Maybe you should delate later
		// Соответствия между идентификаторами слов в предложении и идентификаторами фраз в базе данных с анализом фразы
		// phrasesMapping?: { wordIds: number[]; phraseIdInDb: number }[]
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

// Тип данных для структуры текста наполненный дополнительными сведениями (используется на клиенте)
export namespace ChapterTextStructurePopulated {
	// Надо бы добавить сюда идентификатор статьи. Требуется при запросах на анализ.
	export type Chapter = (Sentence | Space | CarriageReturn | Punctuation)[]

	export type Sentence = {
		id: number
		type: 'sentence'
		translatedSentence: null | string
		parts: SentencePart[]
		phrasesMapping: {
			wordIds: number[]
			phraseIdInDb: number
			analysis: {
				// Краткий перевод фразы
				translation: string
				// Анализ фразы
				analysis: string
				// Примеры использования фразы (предложение на иностранном языке и родном)
				examples: {
					foreignLang: string
					nativeLang: string
				}[]
			}
		}[]
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
}
