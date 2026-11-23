import { normalizePhraseString } from 'utils/stringUtils'
import { LanguageCode } from 'prisma/generated/enums'
import { ENGLISH_WORD_FORMS } from './englishWordForms'
import { FRENCH_WORD_FORMS } from './frenchWordForms'
import { GERMAN_WORD_FORMS } from './germanWordForms'
import { ITALIAN_WORD_FORMS } from './italianWordForms'
import { RUSSIAN_WORD_FORMS } from './russianWordForms'
import { SPANISH_WORD_FORMS } from './spanishWordForms'
import { TURKISH_WORD_FORMS } from './turkishWordForms'
import { WORD_FORMS_KINDS, WordFormsKind } from './wordFormsKind'
import type { WordFormsReference } from './wordFormsReference'

export type WordForms = { kind: WordFormsKind; forms: string[] }

type FormLookupOptions = { optionalPrefix?: RegExp; alternateKey?: (text: string) => string }

function buildFormsIndexes(reference: WordFormsReference, options: FormLookupOptions = {}) {
	const { optionalPrefix, alternateKey } = options
	const byLemma = new Map<string, WordForms[]>()
	const byForm = new Map<string, WordForms[]>()
	const byAlternateForm = new Map<string, WordForms[]>()

	for (const kind of WORD_FORMS_KINDS) {
		for (const [lemma, ...forms] of reference[kind] ?? []) {
			const entry = { kind, forms }
			byLemma.set(lemma, [...(byLemma.get(lemma) ?? []), entry])

			const variants = forms.flatMap((form) => form.split('/').map(normalizePhraseString))
			const keys = new Set(variants)

			if (optionalPrefix) {
				for (const variant of variants) keys.add(variant.replace(optionalPrefix, ''))
			}

			for (const key of keys) {
				byForm.set(key, [...(byForm.get(key) ?? []), entry])
			}

			if (alternateKey) {
				for (const key of new Set([...keys].map(alternateKey))) {
					byAlternateForm.set(key, [...(byAlternateForm.get(key) ?? []), entry])
				}
			}
		}
	}

	return { byLemma, byForm, byAlternateForm, alternateKey }
}

const formsByLanguage: Partial<Record<LanguageCode, ReturnType<typeof buildFormsIndexes>>> = {
	en: buildFormsIndexes(ENGLISH_WORD_FORMS),
	de: buildFormsIndexes(GERMAN_WORD_FORMS, { optionalPrefix: /^(?:der|die|das|hat|ist|am) / }),
	es: buildFormsIndexes(SPANISH_WORD_FORMS, { optionalPrefix: /^(?:el|la|los|las) / }),
	fr: buildFormsIndexes(FRENCH_WORD_FORMS, { optionalPrefix: /^(?:(?:un|une|des|le|je) |j')/ }),
	it: buildFormsIndexes(ITALIAN_WORD_FORMS, { optionalPrefix: /^(?:(?:il|lo|la|i|gli|le|ho|sono) |l')/ }),
	ru: buildFormsIndexes(RUSSIAN_WORD_FORMS, { alternateKey: (text) => text.replace(/ё/g, 'е') }),
	// Сохранённый текст мог получить i вместо ı при переводе в нижний регистр.
	tr: buildFormsIndexes(TURKISH_WORD_FORMS, { alternateKey: (text) => text.replace(/ı/g, 'i') }),
}

/**
 * Возвращает заранее подготовленные формы по леммам слова или по точному совпадению с запросом.
 */
export function getWordForms(sourceLanguageCode: LanguageCode, lemmas: string[], lookedUpText = ''): WordForms[] {
	const indexes = formsByLanguage[sourceLanguageCode]
	if (!indexes) return []

	const groups = lemmas.flatMap((lemma) => indexes.byLemma.get(lemma) ?? [])
	if (groups.length > 0) return mergeSameDerivedForms(groups)

	const normalized = normalizePhraseString(lookedUpText.normalize('NFC').toLocaleLowerCase(sourceLanguageCode))
	const lookup = sourceLanguageCode === 'tr' ? normalized.replace(/i\u0307/g, 'i') : normalized
	const alternate = indexes.alternateKey?.(lookup) ?? lookup
	return mergeSameDerivedForms(indexes.byForm.get(lookup) ?? indexes.byAlternateForm.get(alternate) ?? [])
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
