import type { UserMessageReviewIssue } from '@/entities/aiDialogue/messageCheck/userMessageCheckTypes'

export type ReviewHighlight = {
	sentenceStart: number
	sentenceEnd: number
	fragmentStart: number
	fragmentEnd: number
}

export type ReviewIssue = {
	fragment: string
	replacement: string | null
	explanation: string | null
	highlight: ReviewHighlight | null
}

export function getReviewIssues(
	originalText: string,
	correctedText: string,
	issues: UserMessageReviewIssue[],
	language: string,
): ReviewIssue[] {
	if (!issues.length) return []

	const segmenter = new Intl.Segmenter(language, { granularity: 'sentence' })
	const originalSentences = Array.from(segmenter.segment(originalText))
	const correctedSentences = Array.from(segmenter.segment(correctedText))

	const sentenceEnds = new Map(
		originalSentences.map(({ index, segment }) => [
			index + segment.length - segment.trimStart().length,
			index + segment.trimEnd().length,
		]),
	)

	return issues.map((issue) => {
		const excerpt = issue.sentenceMarkdown.trim()
		const bold = Array.from(excerpt.matchAll(/\*\*([\s\S]+?)\*\*/gu))
		const first = bold[0]
		const last = bold.at(-1)
		const prefix = first ? excerpt.slice(0, first.index) : ''
		const suffix = last ? excerpt.slice(last.index + last[0].length) : ''
		const fragment = first
			? excerpt.slice(prefix.length, excerpt.length - suffix.length).replace(/\*\*/g, '')
			: excerpt
		const correction = first ? issue.correction : undefined
		const pattern = [prefix, fragment, suffix].map((part) => `(${quotePattern(part)})`).join('')
		const matches = Array.from(originalText.matchAll(new RegExp(pattern, 'gu')))
		const wholeSentences = matches.filter(({ index, 0: quote }) => sentenceEnds.get(index) === index + quote.length)
		const possibleMatches = wholeSentences.length ? wholeSentences : matches
		const match = correction
			? possibleMatches[correction.occurrence - 1]
			: matches.length === 1
				? matches[0]
				: undefined

		let highlight: ReviewHighlight | null = null
		let replacement = correction?.replacement ?? null
		if (match) {
			const fragmentStart = match.index + match[1].length
			const fragmentEnd = fragmentStart + match[2].length
			const sentenceIndex = originalSentences.findIndex(
				({ index, segment }) => fragmentStart < index + segment.length,
			)
			const sentence = originalSentences[sentenceIndex]
			const lastSentence = originalSentences.find(({ index, segment }) => fragmentEnd <= index + segment.length)

			if (sentence && lastSentence) {
				const sentenceEnd = lastSentence.index + lastSentence.segment.trimEnd().length
				highlight = {
					sentenceStart: sentence.index,
					sentenceEnd: Math.max(sentenceEnd, fragmentEnd),
					fragmentStart,
					fragmentEnd,
				}

				if (
					!correction &&
					sentence === lastSentence &&
					originalSentences.length === correctedSentences.length
				) {
					replacement = recoverReplacement(originalText, correctedSentences[sentenceIndex].segment, highlight)
				}
			}
		}

		return {
			fragment,
			replacement,
			explanation: correction?.kind === 'language' ? null : issue.explanationMarkdown,
			highlight,
		}
	})
}

function quotePattern(text: string) {
	return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/\s+/gu, '\\s+')
}

function recoverReplacement(original: string, correctedSentence: string, highlight: ReviewHighlight) {
	const { sentenceStart, sentenceEnd, fragmentStart, fragmentEnd } = highlight
	const normalize = (text: string) => text.replace(/\s+/gu, ' ')
	const prefix = normalize(original.slice(sentenceStart, fragmentStart))
	const suffix = normalize(original.slice(fragmentEnd, sentenceEnd))
	const corrected = normalize(correctedSentence.trimEnd())

	if (!corrected.startsWith(prefix) || !corrected.endsWith(suffix)) return null
	const replacement = corrected.slice(prefix.length, corrected.length - suffix.length).trim()
	const fragment = normalize(original.slice(fragmentStart, fragmentEnd)).trim()
	return replacement && replacement !== fragment ? replacement : null
}
