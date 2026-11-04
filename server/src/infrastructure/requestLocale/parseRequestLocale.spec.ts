import { parseRequestLocale } from './parseRequestLocale'

describe('parseRequestLocale', () => {
	it('uses the locale sent by the client', () => {
		expect(parseRequestLocale('ru')).toBe('ru')
		expect(parseRequestLocale('de-DE')).toBe('de')
	})

	it('picks the supported language with the highest weight from a browser header', () => {
		expect(parseRequestLocale('pl-PL,pl;q=0.9,fr;q=0.7,en;q=0.8')).toBe('en')
		expect(parseRequestLocale('zh, tr;q=0.5')).toBe('tr')
	})

	it('falls back to English for a missing or unsupported header', () => {
		expect(parseRequestLocale(undefined)).toBe('en')
		expect(parseRequestLocale('')).toBe('en')
		expect(parseRequestLocale('pl, zh;q=0.5')).toBe('en')
		expect(parseRequestLocale('ru;q=0')).toBe('en')
	})
})
