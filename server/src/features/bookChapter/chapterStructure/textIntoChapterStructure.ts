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
	// Write function code
}

// Example usage:
textIntoChapterStructure(`Alice was very tired: she had peeped into the book. “And what is the use of a book,” thought Alice “without conversations?”

So she was considering in her own mind.
Suddenly a White Rabbit ran close by her.`)

const expectedResult: ChapterTextStructure.Chapter = [
	{
		id: 1,
		type: 'sentence',
		translatedSentence: null,
		sentenceParts: [
			{
				id: 1,
				type: 'word',
				value: 'Alice',
			},
			{
				id: 2,
				type: 'space',
			},
			{
				id: 3,
				type: 'word',
				value: 'was',
			},
			{
				id: 4,
				type: 'space',
			},
			{
				id: 5,
				type: 'word',
				value: 'very',
			},
			{
				id: 6,
				type: 'space',
			},
			{
				id: 7,
				type: 'word',
				value: 'tired',
			},
			{
				id: 8,
				type: 'punctuation',
				value: ':',
			},
			{
				id: 9,
				type: 'space',
			},
			{
				id: 10,
				type: 'word',
				value: 'she',
			},
			{
				id: 11,
				type: 'space',
			},
			{
				id: 12,
				type: 'word',
				value: 'had',
			},
			{
				id: 13,
				type: 'space',
			},
			{
				id: 14,
				type: 'word',
				value: 'peeped',
			},
			{
				id: 15,
				type: 'space',
			},
			{
				id: 16,
				type: 'word',
				value: 'into ',
			},
			{
				id: 17,
				type: 'space',
			},
			{
				id: 18,
				type: 'word',
				value: 'the',
			},
			{
				id: 19,
				type: 'space',
			},
			{
				id: 20,
				type: 'word',
				value: 'book',
			},
			{
				id: 21,
				type: 'punctuation',
				value: '.',
			},
		],
	},
	{
		id: 2,
		type: 'space',
	},
	{
		id: 3,
		type: 'sentence',
		translatedSentence: null,
		sentenceParts: [
			{
				id: 1,
				type: 'punctuation',
				value: '“',
			},
			{
				id: 2,
				type: 'word',
				value: 'And',
			},
			{
				id: 3,
				type: 'space',
			},
			{
				id: 4,
				type: 'word',
				value: 'what',
			},
			{
				id: 5,
				type: 'space',
			},
			{
				id: 6,
				type: 'word',
				value: 'is',
			},
			{
				id: 7,
				type: 'space',
			},
			{
				id: 8,
				type: 'word',
				value: 'the',
			},
			{
				id: 9,
				type: 'space',
			},
			{
				id: 10,
				type: 'word',
				value: 'use',
			},
			{
				id: 11,
				type: 'space',
			},
			{
				id: 12,
				type: 'word',
				value: 'of',
			},
			{
				id: 13,
				type: 'space',
			},
			{
				id: 14,
				type: 'word',
				value: 'a',
			},
			{
				id: 15,
				type: 'space',
			},
			{
				id: 16,
				type: 'word',
				value: 'book',
			},
			{
				id: 17,
				type: 'punctuation',
				value: ',”',
			},
			{
				id: 18,
				type: 'space',
			},
			{
				id: 19,
				type: 'word',
				value: 'thought',
			},
			{
				id: 20,
				type: 'space',
			},
			{
				id: 21,
				type: 'word',
				value: 'Alice',
			},
			{
				id: 22,
				type: 'space',
			},
			{
				id: 23,
				type: 'punctuation',
				value: '“',
			},
			{
				id: 24,
				type: 'word',
				value: 'without',
			},
			{
				id: 25,
				type: 'space',
			},
			{
				id: 26,
				type: 'word',
				value: 'conversations',
			},
			{
				id: 27,
				type: 'punctuation',
				value: '?”',
			},
		],
	},
	{
		id: 4,
		type: 'carriageReturn',
	},
	{
		id: 5,
		type: 'carriageReturn',
	},
	{
		id: 6,
		type: 'sentence',
		translatedSentence: null,
		sentenceParts: [
			{
				id: 1,
				type: 'word',
				value: 'So',
			},
			{
				id: 2,
				type: 'space',
			},
			{
				id: 3,
				type: 'word',
				value: 'she',
			},
			{
				id: 4,
				type: 'space',
			},
			{
				id: 5,
				type: 'word',
				value: 'was',
			},
			{
				id: 6,
				type: 'space',
			},
			{
				id: 7,
				type: 'word',
				value: 'considering',
			},
			{
				id: 8,
				type: 'space',
			},
			{
				id: 9,
				type: 'word',
				value: 'in',
			},
			{
				id: 10,
				type: 'space',
			},
			{
				id: 11,
				type: 'word',
				value: 'her',
			},
			{
				id: 12,
				type: 'space',
			},
			{
				id: 13,
				type: 'word',
				value: 'own',
			},
			{
				id: 14,
				type: 'space',
			},
			{
				id: 15,
				type: 'word',
				value: 'mind',
			},
			{
				id: 16,
				type: 'punctuation',
				value: '.',
			},
		],
	},
	{
		id: 7,
		type: 'carriageReturn',
	},
	{
		id: 8,
		type: 'sentence',
		translatedSentence: null,
		sentenceParts: [
			{
				id: 1,
				type: 'word',
				value: 'Suddenly',
			},
			{
				id: 2,
				type: 'space',
			},
			{
				id: 3,
				type: 'word',
				value: 'a',
			},
			{
				id: 4,
				type: 'space',
			},
			{
				id: 5,
				type: 'word',
				value: 'White',
			},
			{
				id: 6,
				type: 'space',
			},
			{
				id: 7,
				type: 'word',
				value: 'Rabbit',
			},
			{
				id: 8,
				type: 'space',
			},
			{
				id: 9,
				type: 'word',
				value: 'ran',
			},
			{
				id: 10,
				type: 'space',
			},
			{
				id: 11,
				type: 'word',
				value: 'close',
			},
			{
				id: 12,
				type: 'space',
			},
			{
				id: 13,
				type: 'word',
				value: 'by',
			},
			{
				id: 14,
				type: 'space',
			},
			{
				id: 15,
				type: 'word',
				value: 'her',
			},
			{
				id: 16,
				type: 'punctuation',
				value: '.',
			},
		],
	},
]
