// import { ChapterTextStructure } from '../chapterStructureTypes'

/**
 * Converts raw chapter text into a structured representation of sentences, carriage return.
 * @param chapterText Raw chapter text consisting of one or more paragraphs
 * @returns ChapterTextStructure.Chapter Structured paragraphs -> sentences -> parts
 */
/*export function textIntoChapterStructure(chapterText: string): ChapterTextStructure.Chapter {
	const sentences: ChapterTextStructure.Chapter = []

	let i = 0
	const n = chapterText.length
	let parts: ChapterTextStructure.Sentence['p'] = []

	function pushSpaceIfNeeded() {
		if (parts.length === 0) return
		const last = parts[parts.length - 1]
		if (last.t !== 's') parts.push({ t: 's' })
	}

	function trimTrailingSpace() {
		if (parts.length && parts[parts.length - 1].t === 's') parts.pop()
	}

	const isAlphaNum = (ch: string) => /[A-Za-z0-9]/.test(ch)
	const isWhitespace = (ch: string) => /\s/.test(ch)
	const isWordJoiner = (prev: string, cur: string, next: string) => {
		// Allow hyphen or apostrophe as part of a word when surrounded by alphanumerics
		if ((cur === '-' || cur === '\'' || cur === '’') && isAlphaNum(prev) && isAlphaNum(next)) return true
		return false
	}

	while (i < n) {
		// Skip leading whitespace for a sentence (do not add spaces between sentences)
		if (parts.length === 0) {
			while (i < n && isWhitespace(chapterText[i])) i++
			if (i >= n) break
		}

		const ch = chapterText[i]

		if (isAlphaNum(ch)) {
			// Build a word, allowing internal hyphens/apostrophes when surrounded by alphanumerics
			let start = i
			i++
			while (i < n) {
				const cur = chapterText[i]
				if (isAlphaNum(cur)) {
					i++
					continue
				}
				const prev = chapterText[i - 1]
				const next = i + 1 < n ? chapterText[i + 1] : ''
				if (isWordJoiner(prev, cur, next)) {
					i += 1 // include joiner
					continue
				}
				break
			}
			parts.push({ t: 'w', v: chapterText.slice(start, i) })
			continue
		}

		if (isWhitespace(ch)) {
			// Collapse any sequence of whitespace into a single space inside a sentence
			pushSpaceIfNeeded()
			while (i < n && isWhitespace(chapterText[i])) i++
			continue
		}

		// Punctuation: aggregate consecutive punctuation characters
		let pStart = i
		let encounteredTerminator = false
		while (i < n) {
			const c = chapterText[i]
			if (isAlphaNum(c) || isWhitespace(c)) break
			if (c === '.' || c === '!' || c === '?') encounteredTerminator = true
			i++
		}
		const punc = chapterText.slice(pStart, i)
		parts.push({ t: 'pn', v: punc })

		if (encounteredTerminator) {
			// End of sentence: include trailing punctuation, trim trailing space, finalize
			trimTrailingSpace()
			if (parts.length) {
				sentences.push({ t: 'sn', tr: null, p: parts })
			}
			parts = []
			// Skip any whitespace between sentences without adding it
			while (i < n && isWhitespace(chapterText[i])) i++
		}
	}

	// Flush last sentence if any content remains
	trimTrailingSpace()
	if (parts.length) {
		sentences.push({ t: 'sn', tr: null, p: parts })
	}

	return sentences
}*/
