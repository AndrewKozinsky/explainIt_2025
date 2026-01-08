import { PopulatedSubtitlesStructure } from '_pages/video/watching/common/populatedSubtitlesStructure'

export function updateFromSubtitlesSelected(
	populatedSubtitles: PopulatedSubtitlesStructure.Structure | null,
	updateSelectedText: (sentence: null | string, words: string[]) => void,
) {
	if (!populatedSubtitles) return

	const { subtitleId, wordIds } = populatedSubtitles.selected
	if (subtitleId === null || !wordIds.length) {
		updateSelectedText(null, [])
		return
	}

	const subtitle = populatedSubtitles.subtitles.find(isSubtitleById(subtitleId))

	if (!subtitle) {
		updateSelectedText(null, [])
		return
	}

	const selectedText = subtitle.texts.find((text) => hasAnySelectedWord(text.textParts, wordIds))
	if (!selectedText) {
		updateSelectedText(null, [])
		return
	}

	const sentenceObj = populatedSubtitles.sentences.find((sentence) => sentence.id === selectedText.sentenceId)
	if (!sentenceObj) {
		updateSelectedText(null, [])
		return
	}

	const sentence = textPartsToString(sentenceObj.text)
	const words = getSelectedWordsFromTextParts(selectedText.textParts, wordIds)

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

function hasAnySelectedWord(textParts: PopulatedSubtitlesStructure.TextPart[], wordIds: number[]): boolean {
	for (const part of textParts) {
		if (part.type !== 'word') continue
		if (wordIds.includes(part.id)) return true
	}

	return false
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

function isSubtitleById(subtitleId: number) {
	return function (
		subtitleOrBar: PopulatedSubtitlesStructure.Subtitle | PopulatedSubtitlesStructure.SpeechlessBar,
	): subtitleOrBar is PopulatedSubtitlesStructure.Subtitle {
		return subtitleOrBar.type === 'subtitle' && subtitleOrBar.id === subtitleId
	}
}
