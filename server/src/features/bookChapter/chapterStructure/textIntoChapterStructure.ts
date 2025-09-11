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
	const normalizedText = chapterText.replace(/\r\n/g, '\n').trim()
	const paragraphs = normalizedText.split(/\n{2,}/)

	const chapter: ChapterTextStructure.Chapter = []
	let componentId = 1

	paragraphs.forEach((paragraph, pIndex) => {
		const sentences = paragraph.split(/(?<=[.?!])\s*/)

		sentences.forEach((sentenceStr, sIndex) => {
			if (!sentenceStr.trim()) return

			const sentenceParts: ChapterTextStructure.SentencePart[] = []
			let partId = 1
			let currentPos = 0

			while (currentPos < sentenceStr.length) {
				const remainingStr = sentenceStr.substring(currentPos)

				let match = remainingStr.match(/^(\s+)/)
				if (match) {
					const spaces = match[0]
					for (let i = 0; i < spaces.length; i++) {
						if (spaces[i] === '\n') {
							sentenceParts.push({ id: partId++, type: 'carriageReturn' })
						} else {
							sentenceParts.push({ id: partId++, type: 'space' })
						}
					}
					currentPos += spaces.length
					continue
				}

				match = remainingStr.match(/^(“|”|"|'|:|\.|,|\?|!|,|”|,)/)
				if (match) {
					sentenceParts.push({ id: partId++, type: 'punctuation', value: match[0] })
					currentPos += match[0].length
					continue
				}

				match = remainingStr.match(/^([a-zA-Z0-9]+)/)
				if (match) {
					sentenceParts.push({ id: partId++, type: 'word', value: match[0] })
					currentPos += match[0].length
					continue
				}

				currentPos++
			}

			chapter.push({
				id: componentId++,
				type: 'sentence',
				translatedSentence: null,
				sentenceParts: sentenceParts,
			})
		})

		if (pIndex < paragraphs.length - 1) {
			chapter.push({ id: componentId++, type: 'carriageReturn' })
			chapter.push({ id: componentId++, type: 'carriageReturn' })
		}
	})

	return chapter
}

// Example usage:
textIntoChapterStructure(`Alice was very tired: she had the book. “What is the use of a book,” thought Alice “without conversations?”

So she was confused.
White Rabbit ran by her.`)

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
				value: 'the',
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
				value: 'What',
			},
			{
				id: 3,
				type: 'space',
			},
			{
				id: 4,
				type: 'word',
				value: 'is',
			},
			{
				id: 5,
				type: 'space',
			},
			{
				id: 6,
				type: 'word',
				value: 'the',
			},
			{
				id: 7,
				type: 'space',
			},
			{
				id: 8,
				type: 'word',
				value: 'use',
			},
			{
				id: 9,
				type: 'space',
			},
			{
				id: 10,
				type: 'word',
				value: 'of',
			},
			{
				id: 11,
				type: 'space',
			},
			{
				id: 12,
				type: 'word',
				value: 'a',
			},
			{
				id: 13,
				type: 'space',
			},
			{
				id: 14,
				type: 'word',
				value: 'book',
			},
			{
				id: 15,
				type: 'punctuation',
				value: ',”',
			},
			{
				id: 16,
				type: 'space',
			},
			{
				id: 17,
				type: 'word',
				value: 'thought',
			},
			{
				id: 18,
				type: 'space',
			},
			{
				id: 19,
				type: 'word',
				value: 'Alice',
			},
			{
				id: 20,
				type: 'space',
			},
			{
				id: 21,
				type: 'punctuation',
				value: '“',
			},
			{
				id: 22,
				type: 'word',
				value: 'without',
			},
			{
				id: 23,
				type: 'space',
			},
			{
				id: 24,
				type: 'word',
				value: 'conversations',
			},
			{
				id: 25,
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
				value: 'confused',
			},
			{
				id: 8,
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
				value: 'White',
			},
			{
				id: 2,
				type: 'space',
			},
			{
				id: 3,
				type: 'word',
				value: 'Rabbit',
			},
			{
				id: 4,
				type: 'space',
			},
			{
				id: 5,
				type: 'word',
				value: 'ran',
			},
			{
				id: 6,
				type: 'space',
			},
			{
				id: 7,
				type: 'word',
				value: 'by',
			},
			{
				id: 8,
				type: 'space',
			},
			{
				id: 9,
				type: 'word',
				value: 'her',
			},
			{
				id: 10,
				type: 'punctuation',
				value: '.',
			},
		],
	},
]
