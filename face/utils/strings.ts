/**
 * Форматирует текст для лучшего вида.
 * Сейчас пока ставит неразрывные пробелы чтобы не было висячих строк.
 * Возможно в будущем добавится что-то ещё.
 * @param text — строка, которую нужно форматировать.
 */
export function typographyText(text: string) {
	let newText = text.replaceAll(' и ', ' и\u00A0')

	newText = newText.replaceAll(/ a$/gi, '\u00A0a')

	return newText
}

/**
 * Получает строку и переводит апостроф к одному виду
 * @param str — строка, где нужно привести апостроф к одному виду
 */
/*export function putApostropheToStandardType(str: string): string {
	let fixedStr = str.replace(/′/g, "'")
	fixedStr = fixedStr.replace(/'/g, "'")

	return fixedStr
}*/

/**
 * Получает сокращённую форму слова и возвращает полную.
 * Нужно добавить другие варианты сокращённого и развёрнутого варианта слов.
 * Там их много. Поищи в интернете.
 * @param shortFormStr
 * @param type
 */
/*export function getFullWordFormFromAbbreviatedForm(shortFormStr: string, type?: 'have' | 'be') {
	const standardShortForm = putApostropheToStandardType(shortFormStr)

	// Нужно заменить апостроф на стандартный апостроф!!!!
	const fullForms = {
		"don't": 'do not',
	}

	// @ts-ignore
	const fullForm = fullForms[standardShortForm]

	if (fullForm) {
		return fullForm
	}

	if (standardShortForm === "he's") {
		if (type === 'have') {
			return 'he has'
		} else if (type === 'be') {
			return 'he is'
		}
	}

	return 'Unknown'
}*/
