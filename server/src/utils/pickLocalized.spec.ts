import { pickLocalized } from './pickLocalized'

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
