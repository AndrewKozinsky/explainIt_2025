import { FALLBACK_DICTIONARY_ROUTE, parseDictionaryRouterResult } from './parseDictionaryRouterResult'

describe('parseDictionaryRouterResult', () => {
	it('reads kind and lemmas', () => {
		expect(parseDictionaryRouterResult('{"exists":true,"kind":"inflected","lemmas":["see","saw"]}')).toEqual({
			exists: true,
			kind: 'inflected',
			lemmas: ['see', 'saw'],
		})
	})

	it('marks a non-existent word', () => {
		expect(parseDictionaryRouterResult('{"exists":false,"kind":"other","lemmas":[]}').exists).toBe(false)
	})

	it('falls back without blocking the article when the answer is unreadable', () => {
		expect(parseDictionaryRouterResult('oops')).toEqual(FALLBACK_DICTIONARY_ROUTE)
	})

	it('treats an unknown kind as other', () => {
		expect(parseDictionaryRouterResult('{"exists":true,"kind":"weird","lemmas":[]}').kind).toBe('other')
	})

	it('normalizes lemmas and removes duplicates and garbage', () => {
		const route = parseDictionaryRouterResult('{"exists":true,"kind":"lexical","lemmas":[" Bring ","bring",3,""]}')

		expect(route.lemmas).toEqual(['bring'])
	})
})
