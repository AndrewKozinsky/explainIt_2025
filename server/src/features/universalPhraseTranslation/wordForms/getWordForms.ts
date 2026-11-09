import { LanguageCode } from 'prisma/generated/enums'
import { ENGLISH_WORD_FORMS } from './englishWordForms'

export type WordForms = { forms: string[] }

/** Строка справочника: формы через пробел, варианты одной формы через «/». Первая форма — лемма. */
function buildFormsByLemma(wordFormLines: string[]): Map<string, WordForms[]> {
	const formsByLemma = new Map<string, WordForms[]>()

	for (const wordFormLine of wordFormLines) {
		const forms = wordFormLine.split(' ')
		formsByLemma.set(forms[0], [...(formsByLemma.get(forms[0]) ?? []), { forms }])
	}

	return formsByLemma
}

const formsByLemmaAndLanguage: Partial<Record<LanguageCode, Map<string, WordForms[]>>> = {
	en: buildFormsByLemma(ENGLISH_WORD_FORMS),
}

/**
 * Возвращает заранее подготовленные формы для лемм слова.
 * Слова нет в справочнике — блока форм просто не будет: модель эти таблицы не дополняет.
 */
export function getWordForms(sourceLanguageCode: LanguageCode, lemmas: string[]): WordForms[] {
	const formsByLemma = formsByLemmaAndLanguage[sourceLanguageCode]
	if (!formsByLemma) return []

	return lemmas.flatMap((lemma) => formsByLemma.get(lemma) ?? [])
}
