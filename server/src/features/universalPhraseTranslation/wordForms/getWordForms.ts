import { normalizePhraseString } from 'utils/stringUtils'
import { LanguageCode } from 'prisma/generated/enums'
import { ENGLISH_WORD_FORMS } from './englishWordForms'
import { GERMAN_WORD_FORMS } from './germanWordForms'
import { WORD_FORMS_KINDS, WordFormsKind } from './wordFormsKind'
import type { WordFormsReference } from './wordFormsReference'

export type WordForms = { kind: WordFormsKind; forms: string[] }

function buildFormsIndexes(reference: WordFormsReference, optionalPrefix?: RegExp) {
	const byLemma = new Map<string, WordForms[]>()
	const byForm = new Map<string, WordForms[]>()

	for (const kind of WORD_FORMS_KINDS) {
		for (const [lemma, ...forms] of reference[kind]) {
			const entry = { kind, forms }
			byLemma.set(lemma, [...(byLemma.get(lemma) ?? []), entry])

			const variants = forms.flatMap((form) => form.toLowerCase().split('/'))
			const keys = new Set(variants)

			if (optionalPrefix) {
				for (const variant of variants) keys.add(variant.replace(optionalPrefix, ''))
			}

			for (const key of keys) {
				byForm.set(key, [...(byForm.get(key) ?? []), entry])
			}
		}
	}

	return { byLemma, byForm }
}

const formsByLanguage: Partial<Record<LanguageCode, ReturnType<typeof buildFormsIndexes>>> = {
	en: buildFormsIndexes(ENGLISH_WORD_FORMS),
	de: buildFormsIndexes(GERMAN_WORD_FORMS, /^(?:der|die|das|hat|ist|am) /),
}

/**
 * Возвращает заранее подготовленные формы по леммам слова или по точному совпадению с запросом.
 */
export function getWordForms(sourceLanguageCode: LanguageCode, lemmas: string[], lookedUpText = ''): WordForms[] {
	const indexes = formsByLanguage[sourceLanguageCode]
	if (!indexes) return []

	const groups = lemmas.flatMap((lemma) => indexes.byLemma.get(lemma) ?? [])
	const matchingGroups = groups.length > 0 ? groups : (indexes.byForm.get(normalizePhraseString(lookedUpText)) ?? [])

	return mergeSameDerivedForms(matchingGroups)
}

/**
 * Склеивает строки одного вида, у которых совпадают все формы после первой:
 * best — это и good, и well, поэтому вместо двух одинаковых таблиц будет одна «good/well better best».
 */
function mergeSameDerivedForms(wordFormsGroups: WordForms[]): WordForms[] {
	const mergedGroups: WordForms[] = []

	for (const wordForms of wordFormsGroups) {
		const sameDerivedGroup = mergedGroups.find(
			(mergedGroup) =>
				mergedGroup.kind === wordForms.kind &&
				mergedGroup.forms.length === wordForms.forms.length &&
				wordForms.forms.slice(1).every((form, index) => form === mergedGroup.forms[index + 1]),
		)

		if (sameDerivedGroup) {
			sameDerivedGroup.forms = [
				`${sameDerivedGroup.forms[0]}/${wordForms.forms[0]}`,
				...sameDerivedGroup.forms.slice(1),
			]
		} else {
			mergedGroups.push({ kind: wordForms.kind, forms: [...wordForms.forms] })
		}
	}

	return mergedGroups
}
