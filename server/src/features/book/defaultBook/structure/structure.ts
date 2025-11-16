import { ChapterTextStructure } from '../../chapterStructure/chapterStructureTypes'
import { chapter_1 } from './chapter_1'
import { chapter_2 } from './chapter_2'
import { chapter_3 } from './chapter_3'
import { chapter_4 } from './chapter_4'
import { chapter_5 } from './chapter_5'
import { chapter_6 } from './chapter_6'
import { chapter_7 } from './chapter_7'
import { chapter_8 } from './chapter_8'
import { chapter_9 } from './chapter_9'
import { chapter_10 } from './chapter_10'
import { chapter_11 } from './chapter_11'
import { chapter_12 } from './chapter_12'
import { chapter_13 } from './chapter_13'
import { chapter_14 } from './chapter_14'
import { chapter_15 } from './chapter_15'
import { chapter_16 } from './chapter_16'
import { chapter_17 } from './chapter_17'
import { chapter_18 } from './chapter_18'
import { chapter_19 } from './chapter_19'
import { chapter_20 } from './chapter_20'
import { chapter_21 } from './chapter_21'
import { chapter_22 } from './chapter_22'
import { chapter_23 } from './chapter_23'
import { chapter_24 } from './chapter_24'

export const chapters = [
	chapter_1,
	chapter_2,
	chapter_3,
	chapter_4,
	chapter_5,
	chapter_6,
	chapter_7,
	chapter_8,
	chapter_9,
	chapter_10,
	chapter_11,
	chapter_12,
	chapter_13,
	chapter_14,
	chapter_15,
	chapter_16,
	chapter_17,
	chapter_18,
	chapter_19,
	chapter_20,
	chapter_21,
	chapter_22,
	chapter_23,
	chapter_24,
]

export function getStructuredContent(): ChapterTextStructure.Chapter[] {
	return chapters.map((chapter) => {
		return chapter.data.map((sentence) => {
			return {
				t: 'sentence',
				translation: sentence.translate,
				parts: divideTextIntoSentenceParts(sentence.sentence),
			} as ChapterTextStructure.Sentence
		})
	})
}

export function divideTextIntoSentenceParts(sentenceText: string): ChapterTextStructure.SentencePart[] {
	const parts: ChapterTextStructure.SentencePart[] = []
	if (!sentenceText) return parts

	let i = 0
	const len = sentenceText.length

	const isAlphaNum = (ch: string) => /[A-Za-z0-9]/.test(ch)
	const isWhitespace = (ch: string) => ch === ' ' || ch === '\t' || ch === '\u00A0'
	const isApostrophe = (ch: string) => ch === '\'' || ch === '’'

	while (i < len) {
		const ch = sentenceText[i]

		// Handle new lines (\r\n as single CR, or standalone \r / \n)
		if (ch === '\r') {
			if (i + 1 < len && sentenceText[i + 1] === '\n') {
				i += 2
			} else {
				i += 1
			}
			parts.push({ t: 'carriageReturn' })
			continue
		}
		if (ch === '\n') {
			i += 1
			parts.push({ t: 'carriageReturn' })
			continue
		}

		// Collapse consecutive spaces/tabs/nbsp into a single space token
		if (isWhitespace(ch)) {
			while (i < len && isWhitespace(sentenceText[i])) i++
			parts.push({ t: 'space' })
			continue
		}

		// Words: letters/digits with possible internal apostrophes (', ’)
		if (isAlphaNum(ch)) {
			const start = i
			i += 1
			while (i < len) {
				const c2 = sentenceText[i]
				if (isAlphaNum(c2)) {
					i++
					continue
				}
				if (isApostrophe(c2)) {
					const prev = sentenceText[i - 1] ?? ''
					const next = sentenceText[i + 1] ?? ''
					if (isAlphaNum(prev) && isAlphaNum(next)) {
						i++ // include the apostrophe and continue growing the word
						continue
					}
				}
				break
			}
			const word = sentenceText.slice(start, i)
			parts.push({ t: 'word', v: word })
			continue
		}

		// Ellipsis '...' as a single punctuation token
		if (ch === '.' && i + 2 < len && sentenceText[i + 1] === '.' && sentenceText[i + 2] === '.') {
			parts.push({ t: 'punctuation', v: '...' })
			i += 3
			continue
		}

		// Any other symbol treated as punctuation (quotes, dashes, hyphens, commas, etc.)
		parts.push({ t: 'punctuation', v: ch })
		i += 1
	}

	return parts
}
