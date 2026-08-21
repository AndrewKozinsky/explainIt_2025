import { LanguageCode, UniversalPhraseTranslationStatus } from 'prisma/generated/enums'

export type UniversalPhraseTranslationServiceModel = {
	id: number
	universalPhraseId: number
	targetLanguageCode: LanguageCode
	translation: null | TranslationBlock[]
	status: UniversalPhraseTranslationStatus
	errorCode: null | string
	nonExistentWord: boolean
	createdAt: Date
}

/**
 * Корневой тип — массив блоков, формирующих статью-объяснение.
 * На верхнем уровне могут быть любые типы блоков.
 */
export type TranslationBlock = BlockBlock | UseCaseBlock | PaperBlock | ExampleBlock | TextBlock

/** Секция с заголовком и вложенными блоками */
export type BlockBlock = {
	type: 'block'
	header: string
	children: TranslationBlock[]
}

/** Сценарий употребления с заголовком и вложенными блоками */
export type UseCaseBlock = {
	type: 'useCase'
	header: string
	children: TranslationBlock[]
}

/** Визуальная обёртка-карточка */
export type PaperBlock = {
	type: 'paper'
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
