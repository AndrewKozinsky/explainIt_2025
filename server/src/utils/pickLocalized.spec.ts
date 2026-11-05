import { pickLocalized, pickLocalizedList } from './pickLocalized'

describe('pickLocalized', () => {
	const raw = JSON.stringify({ en: 'Hotel', ru: 'Отель', '*': 'Any' })

	it('returns the translation for the requested locale', () => {
		expect(pickLocalized(raw, 'ru')).toBe('Отель')
	})

	it('falls back to English, then to the unspecified language, then to the first translation', () => {
		expect(pickLocalized(raw, 'de')).toBe('Hotel')
		expect(pickLocalized(JSON.stringify({ '*': 'Any', fr: 'Hôtel' }), 'de')).toBe('Any')
		expect(pickLocalized(JSON.stringify({ fr: 'Hôtel' }), 'de')).toBe('Hôtel')
	})

	it('returns plain text unchanged and an empty string for an empty translation map', () => {
		expect(pickLocalized('My own scenario', 'ru')).toBe('My own scenario')
		expect(pickLocalized('{}', 'ru')).toBe('')
		expect(pickLocalized('', 'ru')).toBe('')
	})
})

describe('pickLocalizedList', () => {
	const raw = JSON.stringify({ en: ['Ask', 'Leave'], ru: ['Спросить', 'Уйти'] })

	it('returns the list for the requested locale and falls back to English', () => {
		expect(pickLocalizedList(raw, 'ru')).toEqual(['Спросить', 'Уйти'])
		expect(pickLocalizedList(raw, 'de')).toEqual(['Ask', 'Leave'])
	})

	it('skips translations that are not lists and drops non-string items', () => {
		expect(pickLocalizedList(JSON.stringify({ ru: 'Строка', en: ['Ask', 1] }), 'ru')).toEqual(['Ask'])
	})

	it('returns an empty list for plain text, an empty map or a JSON array', () => {
		expect(pickLocalizedList('Plain text', 'ru')).toEqual([])
		expect(pickLocalizedList('{}', 'ru')).toEqual([])
		expect(pickLocalizedList('["Ask"]', 'ru')).toEqual([])
	})
})
