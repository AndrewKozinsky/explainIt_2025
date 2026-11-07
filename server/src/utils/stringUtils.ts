import { randomUUID } from 'crypto'

export function createUniqString() {
	return randomUUID()
}

/** Типографские апострофы и их заменители, которые приводятся к обычному «'». */
const APOSTROPHES = /[‘’ʼ`´]/g
/** Типографские кавычки, которые приводятся к обычной «"». */
const DOUBLE_QUOTES = /[“”„«»]/g
/** Знаки препинания и пробелы по краям текста, кроме апострофа: он часть слова ('cause, rock 'n' roll). */
const EDGE_PUNCTUATION = /^(?:(?!')[\p{P}\s])+|(?:(?!')[\p{P}\s])+$/gu

/** Схлопывает пробелы и приводит апострофы и кавычки к обычным символам. */
export function normalizeSentence(text: string): string {
	return text.trim().replace(/\s+/g, ' ').replace(APOSTROPHES, "'").replace(DOUBLE_QUOTES, '"')
}

/**
 * Приводит фразу для Словаря к стандартной форме: «Pretty much.», «“pretty much”» и «  PRETTY much!»
 * дают «pretty much». Кроме normalizeSentence убирает знаки препинания по краям и переводит в нижний регистр.
 * Если текст состоит только из знаков препинания, они сохраняются, чтобы не получить пустую фразу.
 */
export function normalizePhraseString(text: string): string {
	const sentence = normalizeSentence(text)
	const withoutEdgePunctuation = sentence.replace(EDGE_PUNCTUATION, '')

	return (withoutEdgePunctuation || sentence).toLowerCase()
}

/**
 * Схлопывает текст в одну строку: убирает переносы строк и лишние пробелы.
 */
export function dryText(text: string): string {
	return text
		.replace(/[\r\n]+/g, ' ')
		.replace(/\s+/g, ' ')
		.trim()
}
