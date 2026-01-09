import { PopulatedSubtitlesStructure } from '_pages/video/watching/common/populatedSubtitlesStructure'

export function updateFromSubtitlesSelected(
	populatedSubtitles: PopulatedSubtitlesStructure.Structure | null,
	updateSelectedText: (sentence: null | string, words: string[]) => void,
) {
	if (!populatedSubtitles) return

	const { subtitleId, sentenceId, wordIds } = populatedSubtitles.selected
	if (subtitleId === null || sentenceId === null || !wordIds.length) {
		updateSelectedText(null, [])
		return
	}

	const sentenceObj = populatedSubtitles.sentences.find((sentence) => sentence.id === sentenceId)
	if (!sentenceObj) {
		updateSelectedText(null, [])
		return
	}

	const sentence = textPartsToString(sentenceObj.text)
	const words = getSelectedWordsFromTextParts(sentenceObj.text, wordIds)

	updateSelectedText(sentence, words)
}

function textPartsToString(textParts: PopulatedSubtitlesStructure.TextPart[]): string {
	let result = ''
	for (const part of textParts) {
		if (part.type === 'space') result += ' '
		else result += part.value
	}

	return result
}

function getSelectedWordsFromTextParts(textParts: PopulatedSubtitlesStructure.TextPart[], wordIds: number[]): string[] {
	const words: string[] = []

	for (const part of textParts) {
		if (part.type !== 'word') continue
		if (!wordIds.includes(part.id)) continue

		words.push(part.value)
	}

	return words
}
