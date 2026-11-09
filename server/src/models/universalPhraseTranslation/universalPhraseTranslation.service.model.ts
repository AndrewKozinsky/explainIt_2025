import { LanguageCode, UniversalPhraseTranslationStatus } from 'prisma/generated/enums'

export type UniversalPhraseTranslationServiceModel = {
	id: number
	universalPhraseId: number
	targetLanguageCode: LanguageCode
	translation: null | TranslationBlock[]
	status: UniversalPhraseTranslationStatus
	errorCode: null | string
	nonExistentWord: boolean
	lemmas: string[]
	deepSections: null | TranslationBlock[]
	createdAt: Date
}

/**
 * Корневой тип — массив блоков, формирующих статью.
 * На верхнем уровне могут быть любые типы блоков.
 */
export type TranslationBlock = BlockBlock | SenseBlock | ExampleBlock | TextBlock | WordsBlock | ListBlock

/** Секция с заголовком и вложенными блоками */
export type BlockBlock = {
	type: 'block'
	header: string
	children: TranslationBlock[]
}

/** Одно значение слова: перевод в заголовке, ссылка на общую запись значения и вложенные блоки */
export type SenseBlock = {
	type: 'sense'
	header: string
	wordSenseId: null | number
	children: TranslationBlock[]
}

/** Пример предложения с переводом */
export type ExampleBlock = {
	type: 'example'
	sentence: string
	translation: string
}

/** Текст в формате Markdown */
export type TextBlock = {
	type: 'text'
	text: string
}

/** Слово с коротким описанием для сравнения с похожими словами */
export type WordCard = {
	word: string
	description: string
}

/** Похожие слова: текущее слово и слова, статью о которых можно открыть */
export type WordsBlock = {
	type: 'words'
	currentWord: null | WordCard
	similarWords: WordCard[]
}

/** Выражение с переводом */
export type ListItem = {
	term: string
	translation: string
}

/** Список выражений с переводом */
export type ListBlock = {
	type: 'list'
	items: ListItem[]
}
