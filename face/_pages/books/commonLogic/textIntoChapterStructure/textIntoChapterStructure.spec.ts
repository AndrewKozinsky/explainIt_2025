// import { textIntoChapterStructure } from './textIntoChapterStructure'
// import { ChapterTextStructure } from './chapterStructureTypes'

/*describe('textIntoChapterStructure', () => {
	const getTypes = (arr: ChapterTextStructure.Chapter) => arr.map((x) => x.t)

	it('parses sample text with quotes, spaces between sentences, and blank lines', () => {
		const input = `Alice was very tired: she had the book. “What is the use of a book,” thought Alice “without conversations?”\n\nSo she was confused.\nWhite Rabbit ran by her.`

		const out = textIntoChapterStructure(input)
		// Expect: sentence, space, sentence, CR, CR, sentence, CR, sentence
		expect(getTypes(out)).toEqual([
			'sentence',
			'space',
			'sentence',
			'carriageReturn',
			'carriageReturn',
			'sentence',
			'carriageReturn',
			'sentence',
		])

		// First sentence ends with '.'
		const s1 = out[0] as any
		expect(s1.t).toBe('sentence')
		const s1Parts = s1.parts as ChapterTextStructure.SentencePart[]
		expect((s1Parts[s1Parts.length - 1] as any).t).toBe('punctuation')
		expect((s1Parts[s1Parts.length - 1] as any).v).toBe('.')

		// Second sentence contains grouped punctuation for ,” and ends with ?”
		const s2 = out[2] as any
		const s2Puncts = (s2.parts as ChapterTextStructure.SentencePart[]).filter((p: any) => p.t === 'punctuation') as any[]
		expect(s2Puncts.some((p) => p.v === ',”')).toBe(true)
		expect(s2Puncts.some((p) => p.v === '“')).toBe(true)
		expect(s2Puncts.some((p) => p.v === '?”')).toBe(true)

		// Third sentence ends with '.'
		const s3 = out[5] as any
		const s3Parts = s3.parts as ChapterTextStructure.SentencePart[]
		expect((s3Parts[s3Parts.length - 1] as any).v).toBe('.')

		// Fourth sentence ends with '.'
		const s4 = out[7] as any
		const s4Parts = s4.parts as ChapterTextStructure.SentencePart[]
		expect((s4Parts[s4Parts.length - 1] as any).v).toBe('.')
	})

	it('does not end a sentence on ! or ? that occur inside quotes until quotes close', () => {
		const input = 'He said, "Hi!" and left.'
		const out = textIntoChapterStructure(input)
		expect(out.length).toBe(1)
		const sentence = out[0] as any
		const puncts = (sentence.parts as ChapterTextStructure.SentencePart[]).filter((p: any) => p.t === 'punctuation') as any[]
		// expect grouped !"
		expect(puncts.some((p) => p.v === '!"')).toBe(true)
		// must end with '.' finally
		expect((sentence.parts[sentence.parts.length - 1] as any).v).toBe('.')
	})

	it('keeps sentence intact when punctuation occurs inside parentheses', () => {
		const input = 'Hello (wow!) world.'
		const out = textIntoChapterStructure(input)
		expect(out.length).toBe(1)
		const sentence = out[0] as any
		expect((sentence.parts[sentence.parts.length - 1] as any).v).toBe('.')
	})

	it('represents a newline inside a sentence as a carriageReturn part', () => {
		const input = 'Hello\nworld.'
		const out = textIntoChapterStructure(input)
		expect(out.length).toBe(1)
		const sentence = out[0] as any
		const types = (sentence.parts as ChapterTextStructure.SentencePart[]).map((p: any) => p.t)
		expect(types).toContain('carriageReturn')
	})
})*/
