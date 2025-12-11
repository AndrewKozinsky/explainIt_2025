import { describe, it, expect } from 'vitest'

import { textIntoChapterStructure } from './textIntoChapterStructure'
import { ChapterTextStructure } from '../chapterStructureTypes'

function partsToStrings(parts: ChapterTextStructure.Sentence['p']) {
	return parts.map((p) => (p.t === 'w' || p.t === 'pn' ? `${p.t}:${'v' in p ? (p as any).v : ''}` : p.t))
}

describe('textIntoChapterStructure', () => {
	it('splits the sample text into sentences and tokens correctly', () => {
		const input =
			'Alice was very tired: she had the book. “What is the use of a book,” thought Alice “without conversations?”\n\nSo she was confused.\nWhite Rabbit ran by her.'

		const result = textIntoChapterStructure(input)
		expect(result.length).toBe(4)

		// Sentence 1 assertions
		const s1 = result[0]
		expect(s1.t).toBe('sn')
		const s1Parts = s1.p
		expect(s1Parts[0]).toEqual({ t: 'w', v: 'Alice' })
		expect(s1Parts[s1Parts.length - 1]).toEqual({ t: 'pn', v: '.' })
		// Ensure colon kept as punctuation and spaces collapsed
		expect(partsToStrings(s1Parts)).toContain('pn::')

		// Sentence 2 assertions, quotes and combined punctuation like ,”
		const s2 = result[1]
		expect(s2.t).toBe('sn')
		const s2Parts = s2.p
		// Starts with an opening quote punctuation
		expect(s2Parts[0].t).toBe('pn')
		// Contains combined comma+closing quote
		expect(s2Parts.some((p) => p.t === 'pn' && p.v.includes(',') && p.v.includes('”'))).toBe(true)
		// Ends with question mark (maybe together with a quote)
		const lastPn = s2Parts[s2Parts.length - 1]
		expect(lastPn.t).toBe('pn')
		// @ts-ignore
		expect(lastPn.v.includes('?')).toBe(true)

		// Sentence 3
		const s3 = result[2]
		expect(s3.t).toBe('sn')
		expect(s3.p[s3.p.length - 1]).toEqual({ t: 'pn', v: '.' })

		// Sentence 4
		const s4 = result[3]
		expect(s4.t).toBe('sn')
		expect(s4.p[s4.p.length - 1]).toEqual({ t: 'pn', v: '.' })
	})

	it('collapses multiple whitespaces inside a sentence into a single space token', () => {
		const input = 'Hello\t  \n\tworld!'
		const result = textIntoChapterStructure(input)
		expect(result.length).toBe(1)
		const parts = result[0].p
		// Expect pattern: w s w pn
		expect(parts.map((p) => p.t)).toEqual(['w', 's', 'w', 'pn'])
		expect((parts[0] as any).v).toBe('Hello')
		expect((parts[2] as any).v).toBe('world')
		expect((parts[3] as any).v).toBe('!')
	})

	it('treats hyphenated and apostrophized words as single words when appropriate', () => {
		const input = "It was a long-term plan and Alice's idea."
		const result = textIntoChapterStructure(input)
		expect(result.length).toBe(1)
		const words = result[0].p.filter((p) => p.t === 'w') as Extract<
			ChapterTextStructure.Sentence['p'][number],
			{ t: 'w' }
		>[]
		expect(words.some((w) => w.v === 'long-term')).toBe(true)
		expect(words.some((w) => w.v === "Alice's")).toBe(true)
	})
})
