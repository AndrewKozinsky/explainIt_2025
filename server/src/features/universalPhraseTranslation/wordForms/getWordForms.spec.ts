import { LanguageCode } from 'prisma/generated/enums'
import { ENGLISH_WORD_FORMS } from './englishWordForms'
import { getWordForms } from './getWordForms'

describe('getWordForms', () => {
	it('finds an irregular verb by its lemma', () => {
		expect(getWordForms(LanguageCode.en, ['bring'])).toEqual([{ kind: 'irregularVerb', forms: ['bring', 'brought', 'brought'] }])
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
		expect(getWordForms(LanguageCode.en, ['good'])).toEqual([{ kind: 'comparison', forms: ['good', 'better', 'best'] }])
	})

	it('returns nothing for a regular word', () => {
		expect(getWordForms(LanguageCode.en, ['walk'])).toEqual([])
	})

	it('returns nothing for a language without prepared forms', () => {
		expect(getWordForms(LanguageCode.tr, ['gitmek'])).toEqual([])
	})

	it('keeps the reference data well formed', () => {
		const wordFormLines = Object.values(ENGLISH_WORD_FORMS).flat()
		const malformedLines = wordFormLines.filter((wordFormLine) => !/^[a-z]+( [a-z/]+){1,2}$/.test(wordFormLine))

		expect(malformedLines).toEqual([])
		expect(new Set(wordFormLines).size).toBe(wordFormLines.length)
	})
})
