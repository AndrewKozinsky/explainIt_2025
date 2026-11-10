import { LanguageCode } from 'prisma/generated/enums'
import { ENGLISH_WORD_FORMS } from './englishWordForms'
import { WORD_FORMS_KINDS, WordFormsKind } from './wordFormsKind'

export type WordForms = { kind: WordFormsKind; forms: string[] }

/** Строка справочника: формы через пробел, варианты одной формы через «/». Первая форма — лемма. */
function buildFormsByLemma(wordFormLinesByKind: Record<WordFormsKind, string[]>): Map<string, WordForms[]> {
	const formsByLemma = new Map<string, WordForms[]>()

	for (const kind of WORD_FORMS_KINDS) {
		for (const wordFormLine of wordFormLinesByKind[kind]) {
			const forms = wordFormLine.split(' ')
			formsByLemma.set(forms[0], [...(formsByLemma.get(forms[0]) ?? []), { kind, forms }])
		}
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

	return mergeSameDerivedForms(lemmas.flatMap((lemma) => formsByLemma.get(lemma) ?? []))
}

/**
 * Склеивает строки одного вида, у которых совпадают все формы кроме леммы:
 * best — это и good, и well, поэтому вместо двух одинаковых таблиц будет одна «good/well better best».
 */
function mergeSameDerivedForms(wordFormsGroups: WordForms[]): WordForms[] {
	const mergedGroups: WordForms[] = []

	for (const wordForms of wordFormsGroups) {
		const sameDerivedGroup = mergedGroups.find(
			(mergedGroup) =>
				mergedGroup.kind === wordForms.kind &&
				mergedGroup.forms.slice(1).join(' ') === wordForms.forms.slice(1).join(' '),
		)

		if (sameDerivedGroup) {
			sameDerivedGroup.forms = [`${sameDerivedGroup.forms[0]}/${wordForms.forms[0]}`, ...sameDerivedGroup.forms.slice(1)]
		} else {
			mergedGroups.push({ kind: wordForms.kind, forms: [...wordForms.forms] })
		}
	}

	return mergedGroups
}
