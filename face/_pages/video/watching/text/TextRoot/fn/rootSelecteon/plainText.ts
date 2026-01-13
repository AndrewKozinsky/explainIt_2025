import { PopulatedTextStructure } from '_pages/video/watching/common/populatedTextStructure'
import { WatchingStoreI } from '_pages/video/watching/watchingStore'

export function updateFromPlainTextSelected(
	populatedPlainText: PopulatedTextStructure.Structure | null,
	updateSelectedText: (selectedText: WatchingStoreI.SelectedText) => void,
) {
	if (!populatedPlainText) return

	const { sentenceId, wordIds } = populatedPlainText.selected
	if (sentenceId === null || !wordIds.length) {
		updateSelectedText({ plainText: null, subtitle: null })
		return
	}

	function toSelectedSentencePart(part: PopulatedTextStructure.SentencePart): WatchingStoreI.SelectedSentencePart {
		if (part.type === 'space') return { id: part.id, type: 'space' }
		return { id: part.id, type: part.type, value: part.value }
	}

	const sentenceObj = populatedPlainText.sentences.find((sentence) => sentence.id === sentenceId)
	if (!sentenceObj) {
		updateSelectedText({ plainText: null, subtitle: null })
		return
	}

	const sentence = sentencePartsToString(sentenceObj.parts)
	const { wordIds: selectedWordIds, wordsTexts } = getSelectedWordsFromSentenceParts(sentenceObj.parts, wordIds)
	const sentenceParts = sentenceObj.parts.map(toSelectedSentencePart)

	updateSelectedText({
		plainText: {
			sentenceId,
			sentenceText: sentence,
			sentenceParts,
			wordIds: selectedWordIds,
			wordsTexts,
		},
		subtitle: null,
	})
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
): { wordIds: number[]; wordsTexts: string[] } {
	const selectedWordIds: number[] = []
	const wordsTexts: string[] = []

	for (const part of parts) {
		if (part.type !== 'word') continue
		if (wordIds.includes(part.id)) {
			selectedWordIds.push(part.id)
			wordsTexts.push(part.value)
		}
	}

	return { wordIds: selectedWordIds, wordsTexts }
}
