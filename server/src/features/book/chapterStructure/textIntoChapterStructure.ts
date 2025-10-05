import { ChapterTextStructure } from './chapterStructureTypes'

/**
 * Converts raw chapter text into a structured representation of sentences, carriage return.
 * @param chapterText Raw chapter text consisting of one or more paragraphs
 * @returns ChapterTextStructure.Chapter Structured paragraphs -> sentences -> parts
 */
export function textIntoChapterStructure(chapterText: string): ChapterTextStructure.Chapter {
	// Normalize newlines to \n
	const text = chapterText.replace(/\r\n/g, '\n').replace(/\r/g, '\n')
	const result: ChapterTextStructure.Chapter = []

	// Helpers: stacks for quotes and parentheses
	const quoteStack: string[] = [] // values: 'double', 'single', 'curly-double', 'curly-single'
	let parenDepth = 0

	// Current sentence assembly
	let currentSentenceParts: ChapterTextStructure.SentencePart[] | null = null
	let wordBuffer = ''
	let punctBuffer = ''

	// Track end-of-sentence candidates
	let punctHadEosTopLevel = false // saw .!? at top-level during current punctuation run
	let eosSeenInsideQuotes = false // saw .!? while inside quotes during current punctuation run

	const startSentence = () => {
		if (!currentSentenceParts) currentSentenceParts = []
	}

	const flushWord = () => {
		if (wordBuffer) {
			startSentence()
			currentSentenceParts!.push({ t: 'word', v: wordBuffer })
			wordBuffer = ''
		}
	}

	const flushPunct = () => {
		if (punctBuffer) {
			startSentence()
			currentSentenceParts!.push({ t: 'punctuation', v: punctBuffer })
			punctBuffer = ''
		}
	}

	const pushSpacePart = () => {
		startSentence()
		const last = currentSentenceParts![currentSentenceParts!.length - 1]
		if (!last || last.t !== 'space') currentSentenceParts!.push({ t: 'space' })
	}

	const pushCarriagePart = () => {
		startSentence()
		const last = currentSentenceParts![currentSentenceParts!.length - 1]
		if (!last || last.t !== 'carriageReturn') currentSentenceParts!.push({ t: 'carriageReturn' })
	}

	const finalizeSentence = () => {
		flushWord()
		flushPunct()
		if (currentSentenceParts && currentSentenceParts.length > 0) {
			result.push({ t: 'sentence', translation: null, parts: currentSentenceParts })
		}
		currentSentenceParts = null
	}

	const isLetterOrDigit = (ch: string) => /[A-Za-z0-9]/.test(ch)
	const isApostrophe = (ch: string) => ch === "'" || ch === '’'
	const isSpace = (ch: string) => ch === ' '
	const isNewline = (ch: string) => ch === '\n'

	// punctuation = any non-letter/digit and not space/newline
	const isPunctChar = (ch: string) => !(isLetterOrDigit(ch) || isSpace(ch) || isNewline(ch))

	const handleQuoteChar = (ch: string) => {
		if (ch === '"') {
			if (quoteStack[quoteStack.length - 1] === 'double') quoteStack.pop()
			else quoteStack.push('double')
			return
		}
		if (ch === '“') {
			quoteStack.push('curly-double')
			return
		}
		if (ch === '”') {
			const idx = quoteStack.lastIndexOf('curly-double')
			if (idx >= 0) quoteStack.splice(idx, 1)
			return
		}
		if (ch === '‘') {
			quoteStack.push('curly-single')
			return
		}
		if (ch === '’') {
			// When used as apostrophe in a word we don't call this. Here it behaves as a closing curly single quote
			const idx = quoteStack.lastIndexOf('curly-single')
			if (idx >= 0) quoteStack.splice(idx, 1)
			return
		}
		if (ch === "'") {
			if (quoteStack[quoteStack.length - 1] === 'single') quoteStack.pop()
			else quoteStack.push('single')
			return
		}
	}

	const openParenIf = (ch: string) => {
		if (ch === '(' || ch === '[' || ch === '{') parenDepth++
	}
	const closeParenIf = (ch: string) => {
		if (ch === ')' || ch === ']' || ch === '}') parenDepth = Math.max(0, parenDepth - 1)
	}

	let i = 0
	while (i < text.length) {
		const ch = text[i]

		// Newlines
		if (isNewline(ch)) {
			if (currentSentenceParts) {
				// newline inside a sentence -> single carriageReturn part
				flushWord()
				flushPunct()
				pushCarriagePart()
				i++
				continue
			} else {
				// Outside sentence -> count run and add same number of top-level carriageReturn
				let count = 1
				i++
				while (i < text.length && isNewline(text[i])) {
					count++
					i++
				}
				for (let k = 0; k < count; k++) result.push({ t: 'carriageReturn' })
				continue
			}
		}
		// Spaces
		if (isSpace(ch)) {
			if (currentSentenceParts) {
				flushWord()
				flushPunct()
				pushSpacePart()
				i++
				continue
			} else {
				// collapse consecutive spaces into a single top-level space
				while (i < text.length && isSpace(text[i])) i++
				if (result.length === 0 || result[result.length - 1].t !== 'space') {
					result.push({ t: 'space' })
				}
				continue
			}
		}

		// Letters/digits or in-word apostrophe
		const next = i + 1 < text.length ? text[i + 1] : ''
		if (isLetterOrDigit(ch) || (isApostrophe(ch) && wordBuffer.length > 0 && isLetterOrDigit(next))) {
			startSentence()
			wordBuffer += ch
			i++
			continue
		}

		// Punctuation handling (cluster it)
		startSentence()
		flushWord()

		// reset EOS markers for this punctuation cluster
		punctHadEosTopLevel = false
		eosSeenInsideQuotes = false

		// Begin cluster
		const startIndex = i
		while (i < text.length) {
			const c = text[i]
			if (!isPunctChar(c)) break // cluster ends

			// EoS candidate?
			if (c === '.' || c === '!' || c === '?') {
				if (quoteStack.length === 0 && parenDepth === 0) punctHadEosTopLevel = true
				else if (quoteStack.length > 0) eosSeenInsideQuotes = true
			}

			// Update stacks
			if (c === '(' || c === '[' || c === '{') openParenIf(c)
			else if (c === ')' || c === ']' || c === '}') closeParenIf(c)
			handleQuoteChar(c)

			punctBuffer += c
			i++
		}

		// push punctuation cluster as one part
		flushPunct()

		// Decide if sentence ends here
		// Lookahead to next non-space character (spaces are handled separately and should not prevent EoS when quotes just closed)
		let la = i
		while (la < text.length && text[la] === ' ') la++
		const nextNonSpace = la < text.length ? text[la] : null

		const isTopLevelNow = quoteStack.length === 0 && parenDepth === 0
		const endBecauseTopLevelMark = punctHadEosTopLevel && isTopLevelNow
		const endBecauseClosedQuotes =
			eosSeenInsideQuotes && isTopLevelNow && (nextNonSpace === null || nextNonSpace === '\n')

		if (endBecauseTopLevelMark || endBecauseClosedQuotes) {
			finalizeSentence()
		}

		// reset EOS markers for next iteration
		punctHadEosTopLevel = false
		eosSeenInsideQuotes = false
	}

	// Flush any remaining sentence at EOF (including cases with buffered word/punct)
	if (currentSentenceParts) finalizeSentence()

	return result
}
