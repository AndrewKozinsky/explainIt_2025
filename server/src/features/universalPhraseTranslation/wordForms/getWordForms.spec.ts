import { LanguageCode } from 'prisma/generated/enums'
import { ENGLISH_WORD_FORMS } from './englishWordForms'
import { getWordForms } from './getWordForms'

describe('getWordForms', () => {
	it('finds an irregular verb by its lemma', () => {
		expect(getWordForms(LanguageCode.en, ['bring'])).toEqual([{ forms: ['bring', 'brought', 'brought'] }])
	})

	it('finds an irregular plural', () => {
		expect(getWordForms(LanguageCode.en, ['child'])).toEqual([{ forms: ['child', 'children'] }])
	})

	it('returns one line per lemma for a word with several possible lemmas', () => {
		expect(getWordForms(LanguageCode.en, ['see', 'saw'])).toEqual([
			{ forms: ['see', 'saw', 'seen'] },
			{ forms: ['saw', 'sawed', 'sawn/sawed'] },
		])
	})

	it('returns nothing for a regular word', () => {
		expect(getWordForms(LanguageCode.en, ['walk'])).toEqual([])
	})

	it('returns nothing for a language without prepared forms', () => {
		expect(getWordForms(LanguageCode.tr, ['gitmek'])).toEqual([])
	})

	it('keeps the reference data well formed', () => {
		const malformedLines = ENGLISH_WORD_FORMS.filter((wordFormLine) => !/^[a-z]+( [a-z/]+){1,2}$/.test(wordFormLine))

		expect(malformedLines).toEqual([])
		expect(new Set(ENGLISH_WORD_FORMS).size).toBe(ENGLISH_WORD_FORMS.length)
	})
})
