import { normalizePhraseString, normalizeSentence } from './stringUtils'

describe('normalizePhraseString', () => {
	it('gives one form for a phrase with and without edge punctuation, case or extra spaces', () => {
		const variants = [
			'Pretty much.',
			'Pretty much',
			'  pretty   MUCH ',
			'Pretty much!',
			'Pretty much?!',
			'Pretty much…',
		]

		for (const variant of variants) {
			expect(normalizePhraseString(variant)).toBe('pretty much')
		}
	})

	it('removes quotes and Spanish inverted marks around the phrase', () => {
		expect(normalizePhraseString('“Pretty much”')).toBe('pretty much')
		expect(normalizePhraseString('«Pretty much»')).toBe('pretty much')
		expect(normalizePhraseString('¿Qué tal?')).toBe('qué tal')
		expect(normalizePhraseString('(pretty much)')).toBe('pretty much')
	})

	it('treats typographic apostrophes as the plain apostrophe', () => {
		expect(normalizePhraseString('you’d rather')).toBe("you'd rather")
		expect(normalizePhraseString('you‘d rather')).toBe("you'd rather")
		expect(normalizePhraseString('youʼd rather')).toBe("you'd rather")
		expect(normalizePhraseString("you'd rather")).toBe("you'd rather")
	})

	it('keeps apostrophes at the edges because they belong to the word', () => {
		expect(normalizePhraseString("'cause")).toBe("'cause")
		expect(normalizePhraseString('rock ’n’ roll.')).toBe("rock 'n' roll")
		expect(normalizePhraseString("goin'")).toBe("goin'")
	})

	it('keeps punctuation inside the phrase', () => {
		expect(normalizePhraseString('well-known')).toBe('well-known')
		expect(normalizePhraseString('Mr. Smith')).toBe('mr. smith')
		expect(normalizePhraseString('yes, please.')).toBe('yes, please')
	})

	it('keeps text made only of punctuation instead of returning an empty phrase', () => {
		expect(normalizePhraseString('?!')).toBe('?!')
	})

	it('is idempotent', () => {
		const normalized = normalizePhraseString(' “Pretty much!” ')

		expect(normalizePhraseString(normalized)).toBe(normalized)
	})
})

describe('normalizeSentence', () => {
	it('collapses spaces and unifies quotes without touching edge punctuation or case', () => {
		expect(normalizeSentence('  “Pretty   much.”  ')).toBe('"Pretty much."')
		expect(normalizeSentence('I’m here')).toBe("I'm here")
	})
})
