import { Language, languages } from 'utils/languages'

const DEFAULT_LOCALE: Language = 'en'

/**
 * Определяет язык интерфейса по заголовку `Accept-Language`.
 * Клиент передаёт в нём локаль страницы; браузерный вариант вида `ru-RU,ru;q=0.9,en;q=0.8` тоже поддерживается:
 * берётся первый поддерживаемый язык в порядке убывания веса. Без подходящего языка возвращается en.
 */
export function parseRequestLocale(header: string | string[] | undefined): Language {
	const value = Array.isArray(header) ? header.join(',') : header
	if (!value) return DEFAULT_LOCALE

	const candidates = value
		.split(',')
		.map((part, index) => {
			const [tag, ...params] = part.trim().split(';')
			const weightParam = params.find((param) => param.trim().startsWith('q='))
			const weight = weightParam ? Number(weightParam.trim().slice(2)) : 1

			return { code: tag.trim().split('-')[0].toLowerCase(), weight: Number.isNaN(weight) ? 0 : weight, index }
		})
		.filter((candidate) => candidate.weight > 0 && candidate.code in languages)
		.sort((a, b) => b.weight - a.weight || a.index - b.index)

	return (candidates[0]?.code as Language | undefined) ?? DEFAULT_LOCALE
}
