const dd = {
	id: 1,
	name: 'book chapter name',
	header: 'book chapter header',
	content: '',
	note: 'book chapter note',
	book: {
		id: 1,
		author: 'author name',
		name: 'book name',
		note: 'just a note',
		userId: 1,
	},
	phrases: [
		{
			id: 1,
			sentence: 'some sentence',
			phrase: 'get out',
			translation: 'Избежать',
			analysis: 'Это фразовый глагол',
			examples: [
				{
					id: 1,
					sentence: 'some sentence',
					translation: 'some translation',
				},
			],
		},
	],
}

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
	export type Chapter = (Sentence | Space | CarriageReturn | Punctuation)[]

	export type Sentence = {
		id: number
		type: 'sentence'
		translation: null | string
		parts: SentencePart[]
		phrasesMapping: {
			phraseIdInDb: number
			phrase: string
			wordIds: number[]
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
