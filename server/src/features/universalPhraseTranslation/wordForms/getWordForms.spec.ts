import { LanguageCode } from 'prisma/generated/enums'
import { ENGLISH_WORD_FORMS } from './englishWordForms'
import { GERMAN_WORD_FORMS } from './germanWordForms'
import { getWordForms } from './getWordForms'
import { WORD_FORMS_KINDS } from './wordFormsKind'

describe('getWordForms', () => {
	it('finds an irregular verb by its lemma', () => {
		expect(getWordForms(LanguageCode.en, ['bring'])).toEqual([
			{ kind: 'irregularVerb', forms: ['bring', 'brought', 'brought'] },
		])
	})

	it('finds an irregular plural', () => {
		expect(getWordForms(LanguageCode.en, ['child'])).toEqual([{ kind: 'plural', forms: ['child', 'children'] }])
	})

	it('returns one line per lemma for a word with several possible lemmas', () => {
		expect(getWordForms(LanguageCode.en, ['see', 'saw'])).toEqual([
			{ kind: 'irregularVerb', forms: ['see', 'saw', 'seen'] },
			{ kind: 'irregularVerb', forms: ['saw', 'sawed', 'sawn/sawed'] },
		])
	})

	it('marks degrees of comparison', () => {
		expect(getWordForms(LanguageCode.en, ['good'])).toEqual([
			{ kind: 'comparison', forms: ['good', 'better', 'best'] },
		])
	})

	it('merges lemmas that share all other forms into one table', () => {
		expect(getWordForms(LanguageCode.en, ['good', 'well'])).toEqual([
			{ kind: 'comparison', forms: ['good/well', 'better', 'best'] },
		])
	})

	it('returns nothing for a regular word', () => {
		expect(getWordForms(LanguageCode.en, ['walk'], 'walked')).toEqual([])
	})

	it('finds an English variant by its text without duplicating the row', () => {
		expect(getWordForms(LanguageCode.en, [], 'Burnt')).toEqual([
			{ kind: 'irregularVerb', forms: ['burn', 'burned/burnt', 'burned/burnt'] },
		])
	})

	it('returns nothing for a language without prepared forms', () => {
		expect(getWordForms(LanguageCode.tr, ['gitmek'])).toEqual([])
	})

	it('keeps German multiword forms in their own slots', () => {
		expect(getWordForms(LanguageCode.de, ['ankommen', 'gut'])).toEqual([
			{ kind: 'irregularVerb', forms: ['ankommen', 'kam an', 'ist angekommen'] },
			{ kind: 'comparison', forms: ['gut', 'besser', 'am besten'] },
		])
	})

	it('shows gender and plural for frequent German nouns', () => {
		expect(getWordForms(LanguageCode.de, ['buch', 'frau', 'lehrer'])).toEqual([
			{ kind: 'plural', forms: ['das Buch', 'die Bücher'] },
			{ kind: 'plural', forms: ['die Frau', 'die Frauen'] },
			{ kind: 'plural', forms: ['der Lehrer', 'die Lehrer'] },
		])
	})

	it('keeps nouns with the same spelling and different genders on separate lines', () => {
		expect(getWordForms(LanguageCode.de, ['band'])).toEqual([
			{ kind: 'plural', forms: ['der Band', 'die Bände'] },
			{ kind: 'plural', forms: ['das Band', 'die Bänder/die Bande'] },
			{ kind: 'plural', forms: ['die Band', 'die Bands'] },
		])
	})

	it.each(['Bücher', 'Die  Bücher'])('looks up %s for an article without saved lemmas', (text) => {
		expect(getWordForms(LanguageCode.de, [], text)).toEqual([{ kind: 'plural', forms: ['das Buch', 'die Bücher'] }])
	})

	it('finds a displayed German form even when the router saved a different lemma', () => {
		expect(getWordForms(LanguageCode.de, ['angekommen'], 'ist angekommen')).toEqual([
			{ kind: 'irregularVerb', forms: ['ankommen', 'kam an', 'ist angekommen'] },
		])
	})

	it.each([
		{ text: 'fand statt', kind: 'irregularVerb', forms: ['stattfinden', 'fand statt', 'hat stattgefunden'] },
		{ text: 'Bänke', kind: 'plural', forms: ['die Bank', 'die Banken/die Bänke'] },
		{ text: 'schneller', kind: 'comparison', forms: ['schnell', 'schneller', 'am schnellsten'] },
	])('looks up the German form $text from the article text', ({ text, kind, forms }) => {
		expect(getWordForms(LanguageCode.de, [], text)).toEqual([{ kind, forms }])
	})

	it('returns no German forms outside the reference', () => {
		expect(getWordForms(LanguageCode.de, ['segelschiff'], 'Segelschiff')).toEqual([])
	})

	it.each([
		['English', ENGLISH_WORD_FORMS],
		['German', GERMAN_WORD_FORMS],
	])('keeps the %s reference data well formed', (_language, reference) => {
		for (const kind of WORD_FORMS_KINDS) {
			const entries = reference[kind]
			const malformedEntries = entries.filter(
				([lemma, ...forms]) =>
					!/^[\p{Ll}]+$/u.test(lemma) ||
					forms.length !== (kind === 'plural' ? 2 : 3) ||
					forms.some((form) => !/^\p{L}+(?:[ /]\p{L}+)*$/u.test(form)),
			)

			expect(malformedEntries).toEqual([])
			expect(new Set(entries.map((entry) => JSON.stringify(entry))).size).toBe(entries.length)
		}
	})
})
