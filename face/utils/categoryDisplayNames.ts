/**
 * Человекочитаемые названия категорий для каждого языка.
 * Ключ первого уровня — код языка, ключ второго уровня — имя папки в content/.
 *
 * Файл не зависит от серверных API (fs, path) — можно импортировать в клиентских компонентах.
 */
const categoryDisplayNames: Record<string, Record<string, string>> = {
	en: {
		phrasal_verb: 'Phrasal Verbs',
		expression: 'Expressions',
	},
}

/**
 * Возвращает отображаемое название категории по коду языка и имени папки.
 * Если название не найдено — возвращает имя папки как есть.
 */
export function getCategoryDisplayName(languageCode: string, folderName: string): string {
	return categoryDisplayNames[languageCode]?.[folderName] ?? folderName
}
