import { PopulatedTextStructure } from '_pages/video/watching/common/populatedTextStructure'

export function updateFromPlainTextSelected(
	populatedPlainText: PopulatedTextStructure.Structure | null,
	updateSelectedText: (sentence: null | string, words: string[]) => void,
) {
	if (!populatedPlainText) return

	const { sentenceId, wordIds } = populatedPlainText.selected
	if (sentenceId === null || !wordIds.length) {
		updateSelectedText(null, [])
		return
	}

	const sentenceObj = populatedPlainText.sentences.find((sentence) => sentence.id === sentenceId)
	if (!sentenceObj) {
		updateSelectedText(null, [])
		return
	}

	const sentence = sentencePartsToString(sentenceObj.parts)
	const words = getSelectedWordsFromSentenceParts(sentenceObj.parts, wordIds)

	updateSelectedText(sentence, words)
}

function sentencePartsToString(parts: PopulatedTextStructure.SentencePart[]): string {
	let result = ''
	for (const part of parts) {
		if (part.type === 'space') result += ' '
		else result += part.value
	}

	return result
}

function getSelectedWordsFromSentenceParts(
	parts: PopulatedTextStructure.SentencePart[],
	wordIds: number[],
): string[] {
	const words: string[] = []

	for (const part of parts) {
		if (part.type !== 'word') continue
		if (!wordIds.includes(part.id)) continue

		words.push(part.value)
	}

	return words
}
