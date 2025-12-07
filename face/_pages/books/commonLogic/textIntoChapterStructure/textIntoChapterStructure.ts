import { ChapterTextStructure } from '../chapterStructureTypes'

/**
 * Converts raw chapter text into a structured representation of sentences, carriage return.
 * @param chapterText Raw chapter text consisting of one or more paragraphs
 * @returns ChapterTextStructure.Chapter Structured paragraphs -> sentences -> parts
 */
export function textIntoChapterStructure(chapterText: string): ChapterTextStructure.Chapter {
	// Normalize newlines to \n
	const text = chapterText.replace(/\r\n/g, '\n').replace(/\r/g, '\n')
	const result: ChapterTextStructure.Chapter = []

	let currentSentenceParts: ChapterTextStructure.SentencePart[] | null = null
	let wordBuffer = ''
	let punctBuffer = ''

	const startSentence = () => {
		if (!currentSentenceParts) currentSentenceParts = []
	}

	const flushWord = () => {
		if (wordBuffer) {
			startSentence()
			currentSentenceParts!.push({ t: 'w', v: wordBuffer })
			wordBuffer = ''
		}
	}

	const flushPunct = () => {
		if (punctBuffer) {
			startSentence()
			currentSentenceParts!.push({ t: 'pn', v: punctBuffer })
			punctBuffer = ''
		}
	}

	const pushSpacePart = () => {
		startSentence()
		const last = currentSentenceParts![currentSentenceParts!.length - 1]
		if (!last || last.t !== 's') currentSentenceParts!.push({ t: 's' })
	}

	const pushCarriagePart = () => {
		startSentence()
		const last = currentSentenceParts![currentSentenceParts!.length - 1]
		if (!last || last.t !== 'cr') currentSentenceParts!.push({ t: 'cr' })
	}

	const finalizeSentence = () => {
		flushWord()
		flushPunct()
		if (currentSentenceParts && currentSentenceParts.length > 0) {
			result.push({ t: 'sn', tr: null, p: currentSentenceParts })
		}
		currentSentenceParts = null
	}

	const isLetterOrDigit = (ch: string) => /[A-Za-z0-9]/.test(ch)
	const isSpace = (ch: string) => ch === ' '
	const isNewline = (ch: string) => ch === '\n'
	const isSentenceEndPunct = (ch: string) => ch === '.' || ch === '!' || ch === '?'

	// Any non-letter/digit that is not space/newline and not a sentence-ending mark
	const isOtherPunct = (ch: string) =>
		!isLetterOrDigit(ch) && !isSpace(ch) && !isNewline(ch) && !isSentenceEndPunct(ch)

	for (let i = 0; i < text.length; i++) {
		const ch = text[i]

		// Newlines -> carriage returns
		if (isNewline(ch)) {
			if (currentSentenceParts) {
				flushWord()
				flushPunct()
				pushCarriagePart()
			} else {
				// top-level carriage return
				result.push({ t: 'cr' })
			}
			continue
		}

		// Spaces
		if (isSpace(ch)) {
			if (currentSentenceParts) {
				flushWord()
				flushPunct()
				pushSpacePart()
			}
			// Ignore spaces between sentences at top level
			continue
		}

		// Sentence-ending punctuation: finish sentence
		if (isSentenceEndPunct(ch)) {
			startSentence()
			flushWord()
			punctBuffer += ch
			// collect repeated sentence-ending chars like "?!" or "..."
			while (i + 1 < text.length && isSentenceEndPunct(text[i + 1])) {
				punctBuffer += text[i + 1]
				i++
			}
			flushPunct()
			finalizeSentence()
			continue
		}

		// Other punctuation inside a sentence
		if (isOtherPunct(ch)) {
			startSentence()
			flushWord()
			punctBuffer += ch
			flushPunct()
			continue
		}

		// Letters/digits and any remaining characters -> word
		startSentence()
		wordBuffer += ch
	}

	// Flush any remaining sentence at EOF
	if (currentSentenceParts) finalizeSentence()

	return result
}
