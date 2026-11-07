/** Типографские апострофы и их заменители, которые приводятся к обычному «'». */
const APOSTROPHES = /[‘’ʼ`´]/g
/** Типографские кавычки, которые приводятся к обычной «"». */
const DOUBLE_QUOTES = /[“”„«»]/g
/** Знаки препинания и пробелы по краям текста, кроме апострофа: он часть слова ('cause, rock 'n' roll). */
const EDGE_PUNCTUATION = /^(?:(?!')[\p{P}\s])+|(?:(?!')[\p{P}\s])+$/gu

/**
 * Приводит фразу Словаря к стандартной форме по тем же правилам, что и сервер
 * (`normalizePhraseString` в server/src/utils/stringUtils.ts): «Pretty much.» и «“pretty much”» дают «pretty much».
 * Используется в ключе кэша, чтобы варианты одной фразы не запрашивались повторно.
 */
export function normalizePhraseText(text: string): string {
	const sentence = text.trim().replace(/\s+/g, ' ').replace(APOSTROPHES, "'").replace(DOUBLE_QUOTES, '"')
	const withoutEdgePunctuation = sentence.replace(EDGE_PUNCTUATION, '')

	return (withoutEdgePunctuation || sentence).toLowerCase()
}
