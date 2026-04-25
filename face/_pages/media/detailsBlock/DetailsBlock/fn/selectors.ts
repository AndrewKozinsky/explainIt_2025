import { DetailsSentenceEntry, PhraseTranslationStatus } from '_pages/media/detailsBlock/detailsStore'

export function findSentenceEntry(input: {
	sentences: DetailsSentenceEntry[]
	sentenceId: null | number
}): null | DetailsSentenceEntry {
	if (input.sentenceId === null) return null

	return input.sentences.find((entry) => entry.sentenceId === input.sentenceId) ?? null
}

export function findCoveringPhrase(input: {
	phrases: PhraseTranslationStatus[]
	startOffset: null | number
	endOffset: null | number
}): null | PhraseTranslationStatus {
	if (input.startOffset === null || input.endOffset === null) return null

	const matched = input.phrases
		.filter((phrase) => {
			return phrase.startOffset <= input.startOffset! && phrase.endOffset >= input.endOffset!
		})
		.sort((a, b) => {
			const aLength = a.endOffset - a.startOffset
			const bLength = b.endOffset - b.startOffset

			return aLength - bLength
		})

	return matched[0] ?? null
}

export function buildWordAnalysisFromPhrase(phrase: null | PhraseTranslationStatus): null | string {
	if (!phrase) return null
	if (!phrase.translation) return null

	const lines = [`* **${phrase.phrase ?? ''}** — ${phrase.translation}`]

	for (const example of phrase.examples ?? []) {
		if (!example.text || !example.translate) continue

		lines.push(`* ${example.text} — ${example.translate}`)
	}

	return lines.join('\n')
}

export function buildWordAnalysesFromPhrases(phrases: PhraseTranslationStatus[]): string[] {
	return phrases
		.map((phrase) => buildWordAnalysisFromPhrase(phrase))
		.filter((analysis): analysis is string => Boolean(analysis))
}
