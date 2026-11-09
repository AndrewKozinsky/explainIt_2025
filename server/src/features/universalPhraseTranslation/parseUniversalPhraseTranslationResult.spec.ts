import { parseDeepSectionsResult, parseUniversalPhraseTranslationResult } from './parseUniversalPhraseTranslationResult'

function articleResponse(blocks: unknown[]): string {
	return JSON.stringify({ blocks })
}

describe('parseUniversalPhraseTranslationResult', () => {
	it('reads the non-existent word answer', () => {
		expect(parseUniversalPhraseTranslationResult('{"nonExistentWord": true}')).toEqual({ type: 'nonExistentWord' })
	})

	it('rejects a response that is not JSON', () => {
		expect(parseUniversalPhraseTranslationResult('not json')).toEqual({ type: 'invalid' })
	})

	it('accepts a response wrapped in a markdown block', () => {
		const wrappedResponse = '```json\n{"blocks":[{"type":"text","text":"Канзас"}]}\n```'

		expect(parseUniversalPhraseTranslationResult(wrappedResponse)).toEqual({
			type: 'translation',
			data: [{ type: 'text', text: 'Канзас' }],
		})
	})

	it('skips unknown and broken blocks instead of failing the article', () => {
		const parsedResult = parseUniversalPhraseTranslationResult(
			articleResponse([{ type: 'mystery' }, { type: 'text' }, { type: 'text', text: 'Остаётся' }]),
		)

		expect(parsedResult).toEqual({ type: 'translation', data: [{ type: 'text', text: 'Остаётся' }] })
	})

	it('treats an article without usable blocks as invalid', () => {
		expect(parseUniversalPhraseTranslationResult(articleResponse([{ type: 'mystery' }]))).toEqual({ type: 'invalid' })
	})

	it('keeps sense metadata and lowercases the lemma', () => {
		const parsedResult = parseUniversalPhraseTranslationResult(
			articleResponse([
				{
					type: 'sense',
					header: 'принёс',
					lemma: 'Bring',
					gloss: 'carry to a place',
					senseRef: 7,
					visual: { kind: 'scene', aspect: 'landscape', prompt: 'A person carries a box' },
					children: [{ type: 'example', sentence: 'She brought it.', translation: 'Она принесла это.' }],
				},
			]),
		)

		expect(parsedResult).toEqual({
			type: 'translation',
			data: [
				{
					type: 'sense',
					header: 'принёс',
					lemma: 'bring',
					gloss: 'carry to a place',
					senseRef: 7,
					visual: { kind: 'scene', aspect: 'landscape', prompt: 'A person carries a box' },
					children: [{ type: 'example', sentence: 'She brought it.', translation: 'Она принесла это.' }],
				},
			],
		})
	})

	it.each([
		['comic uses the strip', { kind: 'comic', prompt: 'Frames' }, 'strip'],
		['a scene is landscape whatever the model asks', { kind: 'scene', aspect: 'strip', prompt: 'A cup' }, 'landscape'],
		['a contrast is landscape', { kind: 'contrast', prompt: 'Two rivers' }, 'landscape'],
	])('%s', (_caseName, visual, expectedAspect) => {
		const parsedResult = parseUniversalPhraseTranslationResult(
			articleResponse([{ type: 'sense', header: 'перевод', gloss: 'meaning', visual, children: [] }]),
		)

		expect(parsedResult).toMatchObject({ data: [{ visual: { aspect: expectedAspect } }] })
	})

	it('keeps similar words and drops the current word and broken cards from them', () => {
		const currentWord = { word: 'Driver', description: 'Управляет транспортом' }
		const chauffeur = { word: 'chauffeur', description: 'Личный водитель' }
		const parsedResult = parseUniversalPhraseTranslationResult(
			articleResponse([{ type: 'words', currentWord, similarWords: [{ word: 'driver', description: 'Дубль' }, { word: 'x' }, chauffeur] }]),
		)

		expect(parsedResult).toEqual({
			type: 'translation',
			data: [{ type: 'words', currentWord, similarWords: [chauffeur] }],
		})
	})

	it('drops a words block without similar words', () => {
		expect(
			parseUniversalPhraseTranslationResult(articleResponse([{ type: 'words', currentWord: null, similarWords: [] }])),
		).toEqual({ type: 'invalid' })
	})

	it('keeps valid list items and skips broken ones', () => {
		const taxiDriver = { term: 'taxi driver', translation: 'таксист' }
		const parsedResult = parseUniversalPhraseTranslationResult(
			articleResponse([{ type: 'list', items: [taxiDriver, { term: 'bus driver' }] }]),
		)

		expect(parsedResult).toEqual({ type: 'translation', data: [{ type: 'list', items: [taxiDriver] }] })
	})

	it('drops a visual of an unknown kind', () => {
		const parsedResult = parseUniversalPhraseTranslationResult(
			articleResponse([{ type: 'sense', header: 'перевод', visual: { kind: 'photo', prompt: 'A cup' }, children: [] }]),
		)

		expect(parsedResult).toMatchObject({ data: [{ visual: null }] })
	})
})

describe('parseDeepSectionsResult', () => {
	it('accepts an empty list of sections', () => {
		expect(parseDeepSectionsResult('{"blocks": []}')).toEqual([])
	})

	it('returns null for an unreadable response so the job can retry', () => {
		expect(parseDeepSectionsResult('oops')).toBeNull()
	})

	it('flattens senses because deep sections never carry illustrations', () => {
		const deepSections = parseDeepSectionsResult(
			articleResponse([{ type: 'sense', header: 'лишнее', children: [{ type: 'text', text: 'Текст' }] }]),
		)

		expect(deepSections).toEqual([{ type: 'text', text: 'Текст' }])
	})
})
