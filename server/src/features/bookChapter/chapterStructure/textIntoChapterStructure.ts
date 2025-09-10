import { ChapterTextStructure } from './chapterStructureTypes'

/**
 * Converts raw chapter text into a structured representation of paragraphs, sentences, and parts.
 *
 * Processing steps:
 * 1) Normalizes all line endings to "\n" and trims leading/trailing whitespace.
 * 2) Splits text into paragraphs by one-or-more line breaks (empty lines are paragraph separators).
 * 3) Splits each paragraph into sentences by '.', '!' or '?', keeping any immediately trailing
 *    closing quotes/brackets (e.g. ", ”, ’, ), ], }) attached to the sentence end.
 * 4) Tokenizes each sentence into parts:
 *    - word: consecutive Unicode letters/digits (\p{L}\p{N}).
 *    - punctuation: consecutive non-space, non-letter/digit characters.
 *    Whitespace is skipped. Token ids start at 1 for each sentence.
 *
 * @param chapterText Raw chapter text consisting of one or more paragraphs
 * @returns ChapterTextStructure.Chapter Structured paragraphs -> sentences -> parts
 */
export function textIntoChapterStructure(chapterText: string): ChapterTextStructure.Chapter {
	// Normalize line endings to \n
	const normalized = (chapterText ?? '').replace(/\r\n/g, '\n').replace(/\r/g, '\n').trim()

	if (!normalized) return []

	// Split into paragraphs: any sequence of one or more newlines separates paragraphs
	const rawParagraphs = normalized.split(/\n+/)
	const paragraphs = rawParagraphs.map((p) => p.trim()).filter((p) => p.length > 0)

	// Helpers
	const closingAfterEndRegex = /['"”’)}\]]+/y // sticky to advance after sentence end

	/**
	 * Splits a paragraph into sentences based on '.', '!' or '?' markers.
	 * Any closing quotes/brackets immediately following the marker are included
	 * in the same sentence (e.g., '... ?"', '... .”'). Whitespace between
	 * sentences is skipped. Returned sentences are trimmed.
	 *
	 * @param paragraph A single paragraph string
	 * @returns Array of sentence strings extracted from the paragraph
	 */
	function splitIntoSentences(paragraph: string): string[] {
		const sentences: string[] = []
		let i = 0
		let start = 0
		const len = paragraph.length
		while (i < len) {
			const ch = paragraph[i]
			if (ch === '.' || ch === '!' || ch === '?') {
				// Advance past the end marker and any immediate closing quotes/brackets
				let end = i + 1
				closingAfterEndRegex.lastIndex = end
				const m = closingAfterEndRegex.exec(paragraph)
				if (m) {
					end = closingAfterEndRegex.lastIndex
				}
				const sentence = paragraph.slice(start, end).trim()
				if (sentence) sentences.push(sentence)
				// Skip following whitespace to start next sentence
				i = end
				while (i < len && /\s/.test(paragraph[i])) i++
				start = i
				continue
			}
			i++
		}
		// If leftover without terminal punctuation, take it as a sentence
		const tail = paragraph.slice(start).trim()
		if (tail) sentences.push(tail)
		return sentences
	}

	/**
	 * Tokenizes a sentence into word and punctuation parts.
	 * - Word tokens are sequences of Unicode letters/digits (\p{L}\p{N}).
	 * - Punctuation tokens are sequences of non-space, non-letter/digit characters.
	 * Whitespace is ignored. Token ids start from 1 and increment for each token.
	 *
	 * @param sentence A sentence string to tokenize
	 * @returns Array of SentencePart tokens (word/punctuation) with incremental ids
	 */
	function tokenizeSentence(sentence: string): ChapterTextStructure.SentencePart[] {
		const parts: ChapterTextStructure.SentencePart[] = []
		let id = 1
		let i = 0
		const len = sentence.length
		while (i < len) {
			const ch = sentence[i]
			// Skip whitespace
			if (/\s/.test(ch)) {
				i++
				continue
			}
			// Word: consecutive unicode letters or digits
			const wordMatch = /^(?:(?<=)|)(([\p{L}\p{N}]+))/u.exec(sentence.slice(i))
			if (wordMatch && wordMatch.index === 0) {
				const value = wordMatch[1]
				parts.push({ id: id++, type: 'word', value })
				i += value.length
				continue
			}
			// Punctuation: consecutive non-letter/digit, non-space characters
			let j = i
			while (j < len && !/\s/.test(sentence[j]) && !/\p{L}|\p{N}/u.test(sentence[j])) {
				j++
			}
			const punct = sentence.slice(i, j)
			if (punct) {
				parts.push({ id: id++, type: 'punctuation', value: punct })
			}
			i = j
		}
		return parts
	}

	const chapter: ChapterTextStructure.Chapter = paragraphs.map((para) => {
		const sentences = splitIntoSentences(para)
		return sentences.map((s) => ({
			sentence: s,
			translatedSentence: null,
			sentenceParts: tokenizeSentence(s),
		}))
	})

	return chapter
}

// Example usage:
textIntoChapterStructure(`Alice was very tired: she had peeped into the book. “And what is the use of a book,” thought Alice “without conversations?”

So she was considering in her own mind. Suddenly a White Rabbit ran close by her.`)

const expectedResult: ChapterTextStructure.Chapter = [
	[
		{
			sentence: 'Alice was very tired: she had peeped into the book.',
			translatedSentence: null,
			sentenceParts: [
				{ id: 1, type: 'word', value: 'Alice' },
				{ id: 2, type: 'word', value: 'was' },
				{ id: 3, type: 'word', value: 'very' },
				{ id: 4, type: 'word', value: 'tired' },
				{ id: 5, type: 'punctuation', value: ':' },
				{ id: 6, type: 'word', value: 'she' },
				{ id: 7, type: 'word', value: 'had' },
				{ id: 8, type: 'word', value: 'peeped' },
				{ id: 9, type: 'word', value: 'into' },
				{ id: 10, type: 'word', value: 'the' },
				{ id: 11, type: 'word', value: 'book' },
				{ id: 12, type: 'punctuation', value: '.' },
			],
		},
		{
			sentence: '“And what is the use of a book,” thought Alice “without conversations?”',
			translatedSentence: null,
			sentenceParts: [
				{ id: 1, type: 'punctuation', value: '“' },
				{
					id: 2,
					type: 'word',
					value: 'And',
				},
				{
					id: 3,
					type: 'word',
					value: 'what',
				},
				{
					id: 4,
					type: 'word',
					value: 'is',
				},
				{
					id: 5,
					type: 'word',
					value: 'the',
				},
				{
					id: 6,
					type: 'word',
					value: 'use',
				},
				{
					id: 7,
					type: 'word',
					value: 'of',
				},
				{
					id: 8,
					type: 'word',
					value: 'a',
				},
				{
					id: 9,
					type: 'word',
					value: 'book',
				},
				{ id: 10, type: 'punctuation', value: ',”' },
				{
					id: 11,
					type: 'word',
					value: 'thought',
				},
				{
					id: 12,
					type: 'word',
					value: 'Alice',
				},
				{ id: 13, type: 'punctuation', value: '“' },
				{
					id: 14,
					type: 'word',
					value: 'without',
				},
				{
					id: 15,
					type: 'word',
					value: 'conversations',
				},
				{ id: 16, type: 'punctuation', value: '?”' },
			],
		},
	],
	[
		{
			sentence: 'So she was considering in her own mind.',
			translatedSentence: null,
			sentenceParts: [
				{ id: 1, type: 'word', value: 'So' },
				{ id: 1, type: 'word', value: 'she' },
				{ id: 1, type: 'word', value: 'was' },
				{ id: 1, type: 'word', value: 'considering' },
				{ id: 1, type: 'word', value: 'in' },
				{ id: 1, type: 'word', value: 'her' },
				{ id: 1, type: 'word', value: 'own' },
				{ id: 1, type: 'word', value: 'mind' },
				{ id: 2, type: 'punctuation', value: '.' },
			],
		},
		{
			sentence: 'Suddenly a White Rabbit ran close by her.',
			translatedSentence: null,
			sentenceParts: [
				{ id: 1, type: 'word', value: 'Suddenly' },
				{ id: 1, type: 'word', value: 'a' },
				{ id: 1, type: 'word', value: 'White' },
				{ id: 1, type: 'word', value: 'Rabbit' },
				{ id: 1, type: 'word', value: 'ran' },
				{ id: 1, type: 'word', value: 'close' },
				{ id: 1, type: 'word', value: 'by' },
				{ id: 1, type: 'word', value: 'her' },
				{ id: 2, type: 'punctuation', value: '.' },
			],
		},
	],
]
