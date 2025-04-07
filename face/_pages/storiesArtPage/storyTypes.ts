// import { GrammarConfigT } from './grammarTypes'

// ПРИ ИЗМЕНЕНИИ ОБНОВИ ТИПЫ НА КЛИЕНТЕ В requests/texts/textsApiTypes.ts
// Объект истории
/*export namespace StoryConfigT {
	// Объект текста
	export type Story = {
		// Заголовок на английском
		enHeader: string
		// Перевод заголовка на английском на русский
		ruHeader: string
		// Уровень сложности текста
		level: ('a1' | 'a2' | 'b1' | 'b2' | 'c1')[]
		// Весь текст
		paragraphs: Paragraph[]
	}

	// Абзац
	export type Paragraph = {
		type: 'paragraph'
		sentences: Sentence[]
	}

	// Предложение
	export type Sentence = {
		type: 'sentence'
		id: number
		sentenceParts: (Word | Punctuation)[]
		phrases: Phrase[]
		sentence: {
			eng: string
			rus: string
		}
	}

	// Слово в предложении
	export type Word = {
		id: number
		type: 'word'
		// Фраза — это одно или несколько слов относящиеся к какой-то грамматической теме.
		// Чтобы отметить такие слова, относящиеся к определённой теме, используют поле phraseIds в слове.
		// Так как слово может относиться к нескольким фразам и нескольким темам, то phraseIds является массивом идентификаторов.
		phraseIds: number[]
		word: {
			// Какой части предложения слово
			partOfSentence: string
			// Какой части речи слово
			partOfSpeech: string
			// Слово на английском
			engWord: string
			// Если engWord сокращённое слово (aren't или Mr.), то тут указывается полное значение
			// Это поле будет заполняться автоматические по списку сокращений
			fullEngWord?: string
			// Перевод слова на русском. Если нельзя подобрать перевод, то поставить пустое значение.
			rusWord: string
			// Если английское слово нельзя перевести на русский, то тут даётся объяснение что оно обозначает.
			rusExplanation: string
			// Транскрипция на британском английском
			enTranscription: string
			// Транскрипция на американском английском
			usTranscription: string
		}
	}

	// Фраза — это одно или несколько слов относящиеся к какой-то грамматической теме.
	// Такие слова отмечены идентификатором.
	// Этот объект связывает слова и грамматическое правило
	export type Phrase = {
		phraseId: number
		grammars: GrammarConfigT.Grammar[]
	}

	// Знак препинания в предложении
	export type Punctuation = {
		type: 'punctuation'
		text: string
	}
}*/
