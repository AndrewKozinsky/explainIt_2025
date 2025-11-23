import { ChapterTextStructure } from 'src/features/book/chapterStructure/chapterStructureTypes'
import { CreateBookChapterInput } from 'src/features/bookChapter/CreateBookChapter.command'

export type ChapterData = {
	name: string
	header: string
	data: {
		sentence: string
		translate: string
	}[]
}

export function getBookChapters(bookId: number, chapters: ChapterData[]): CreateBookChapterInput[] {
	const structuredContent = getStructuredContent(chapters)

	return chapters.map((chapter, i) => {
		const content = JSON.stringify(structuredContent[i])

		return {
			bookId,
			name: chapter.name,
			header: chapter.header,
			content,
		}
	})
}

export function getStructuredContent(chapters: ChapterData[]): ChapterTextStructure.Chapter[] {
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
