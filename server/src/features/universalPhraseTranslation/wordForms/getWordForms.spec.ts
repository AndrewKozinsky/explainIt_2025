import { LanguageCode } from 'prisma/generated/enums'
import { ENGLISH_WORD_FORMS } from './englishWordForms'
import { FRENCH_WORD_FORMS } from './frenchWordForms'
import { GERMAN_WORD_FORMS } from './germanWordForms'
import { getWordForms } from './getWordForms'
import { ITALIAN_WORD_FORMS } from './italianWordForms'
import { RUSSIAN_WORD_FORMS } from './russianWordForms'
import { SPANISH_WORD_FORMS } from './spanishWordForms'
import { TURKISH_WORD_FORMS } from './turkishWordForms'
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

	it('returns nothing for a Turkish word outside the reference', () => {
		expect(getWordForms(LanguageCode.tr, ['masa'], 'masa')).toEqual([])
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
		{ language: LanguageCode.ru, text: 'Шел', kind: 'irregularVerb', forms: ['идти', 'иду', 'идёшь', 'шёл/шла'] },
		{ language: LanguageCode.ru, text: 'детей', kind: 'plural', forms: ['ребёнок', 'дети', 'детей'] },
		{ language: LanguageCode.ru, text: 'ребенок', kind: 'plural', forms: ['ребёнок', 'дети', 'детей'] },
		{
			language: LanguageCode.ru,
			text: 'дороже',
			kind: 'comparison',
			forms: ['дорогой', 'дороже', 'самый дорогой'],
		},
		{ language: LanguageCode.es, text: 'hice', kind: 'irregularVerb', forms: ['hacer', 'hago', 'hice', 'hecho'] },
		{ language: LanguageCode.es, text: 'caracteres', kind: 'plural', forms: ['el carácter', 'los caracteres'] },
		{ language: LanguageCode.es, text: 'el mejor', kind: 'comparison', forms: ['bueno', 'mejor', 'el mejor'] },
		{ language: LanguageCode.fr, text: 'j’écris', kind: 'irregularVerb', forms: ['écrire', "j'écris", 'écrit'] },
		{ language: LanguageCode.fr, text: 'vais', kind: 'irregularVerb', forms: ['aller', 'je vais', 'allé'] },
		{ language: LanguageCode.fr, text: 'yeux', kind: 'plural', forms: ['un œil', 'des yeux'] },
		{ language: LanguageCode.fr, text: 'le mieux', kind: 'comparison', forms: ['bien', 'mieux', 'le mieux'] },
		{
			language: LanguageCode.it,
			text: 'andata',
			kind: 'irregularVerb',
			forms: ['andare', 'vado', 'sono andato/sono andata'],
		},
		{ language: LanguageCode.it, text: 'l’uovo', kind: 'plural', forms: ["l'uovo", 'le uova'] },
		{
			language: LanguageCode.it,
			text: 'meglio di tutti',
			kind: 'comparison',
			forms: ['bene', 'meglio', 'meglio di tutti'],
		},
		{
			language: LanguageCode.tr,
			text: 'gidiyor',
			kind: 'irregularVerb',
			forms: ['gitmek', 'gidiyor', 'gider', 'gitti'],
		},
		{ language: LanguageCode.tr, text: 'KİTABI', kind: 'stemChange', forms: ['kitap', 'kitabı', 'kitaba'] },
		{ language: LanguageCode.tr, text: 'ki\u0307tabi', kind: 'stemChange', forms: ['kitap', 'kitabı', 'kitaba'] },
	])('finds $text in the $language reference by the article text', ({ language, text, kind, forms }) => {
		expect(getWordForms(language, [], text)).toEqual([{ kind, forms }])
	})

	it.each([
		[LanguageCode.en, ENGLISH_WORD_FORMS, 3, 2],
		[LanguageCode.de, GERMAN_WORD_FORMS, 3, 2],
		[LanguageCode.es, SPANISH_WORD_FORMS, 4, 2],
		[LanguageCode.fr, FRENCH_WORD_FORMS, 3, 2],
		[LanguageCode.it, ITALIAN_WORD_FORMS, 3, 2],
		[LanguageCode.ru, RUSSIAN_WORD_FORMS, 4, 3],
		[LanguageCode.tr, TURKISH_WORD_FORMS, 4, 2],
	])('keeps the %s reference data well formed', (_language, reference, verbSlots, pluralSlots) => {
		for (const kind of WORD_FORMS_KINDS) {
			const entries = reference[kind] ?? []
			const slotsByKind = { irregularVerb: verbSlots, plural: pluralSlots, comparison: 3, stemChange: 3 }
			const malformedEntries = entries.filter(
				([lemma, ...forms]) =>
					!/^\p{Ll}+(?: \p{Ll}+)*$/u.test(lemma) ||
					forms.length !== slotsByKind[kind] ||
					forms.some((form) => !/^\p{L}+(?:[ '/-]\p{L}+)*$/u.test(form)),
			)

			expect(malformedEntries).toEqual([])
			expect(new Set(entries.map((entry) => JSON.stringify(entry))).size).toBe(entries.length)
		}
	})
})
