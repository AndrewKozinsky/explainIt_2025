import { PopulatedSubtitlesStructure } from '_pages/video/watching/common/populatedSubtitlesStructure'
import { WatchingStoreI } from '_pages/video/watching/watchingStore'

export function updateFromSubtitlesSelected(
	populatedSubtitles: PopulatedSubtitlesStructure.Structure | null,
	updateSelectedText: (selectedText: WatchingStoreI.SelectedText) => void,
) {
	if (!populatedSubtitles) return

	const { sentenceId, wordIds } = populatedSubtitles.selected
	if (sentenceId === null || !wordIds.length) {
		updateSelectedText({ plainText: null, subtitle: null })
		return
	}

	function toSelectedSentencePart(part: PopulatedSubtitlesStructure.TextPart): WatchingStoreI.SelectedSentencePart {
		if (part.type === 'space') return { id: part.id, type: 'space' }
		return { id: part.id, type: part.type, value: part.value }
	}

	const sentenceObj = populatedSubtitles.sentences.find((sentence) => sentence.id === sentenceId)
	if (!sentenceObj) {
		updateSelectedText({ plainText: null, subtitle: null })
		return
	}

	const subtitleObj = findSubtitleBySelectedWord(populatedSubtitles, sentenceId, wordIds)
	const subtitleText = subtitleObj ? subtitleToString(subtitleObj) : ''

	const sentence = textPartsToString(sentenceObj.text)
	const { wordIds: selectedWordIds, wordsTexts } = getSelectedWordsFromTextParts(sentenceObj.text, wordIds)
	const sentenceParts = sentenceObj.text.map(toSelectedSentencePart)

	updateSelectedText({
		plainText: null,
		subtitle: {
			subtitleText,
			sentenceId,
			sentenceText: sentence,
			sentenceParts,
			wordIds: selectedWordIds,
			wordsTexts,
		},
	})
}

function findSubtitleBySelectedWord(
	populatedSubtitles: PopulatedSubtitlesStructure.Structure,
	sentenceId: number,
	wordIds: number[],
): PopulatedSubtitlesStructure.Subtitle | null {
	for (const item of populatedSubtitles.subtitles) {
		if (item.type !== 'subtitle') continue

		for (const text of item.texts) {
			if (text.sentenceId !== sentenceId) continue
			if (text.textParts.some((part) => wordIds.includes(part.id))) {
				return item
			}
		}
	}

	return null
}

function subtitleToString(subtitle: PopulatedSubtitlesStructure.Subtitle): string {
	let result = ''

	for (let i = 0; i < subtitle.texts.length; i++) {
		const text = subtitle.texts[i]
		result += textPartsToString(text.textParts)
		if (i < subtitle.texts.length - 1) result += ' '
	}

	return result
}

function textPartsToString(textParts: PopulatedSubtitlesStructure.TextPart[]): string {
	let result = ''
	for (const part of textParts) {
		if (part.type === 'space') result += ' '
		else result += part.value
	}

	return result
}

function getSelectedWordsFromTextParts(
	textParts: PopulatedSubtitlesStructure.TextPart[],
	wordIds: number[],
): { wordIds: number[]; wordsTexts: string[] } {
	const selectedWordIds: number[] = []
	const wordsTexts: string[] = []

	for (const part of textParts) {
		if (part.type !== 'word') continue
		if (wordIds.includes(part.id)) {
			selectedWordIds.push(part.id)
			wordsTexts.push(part.value)
		}
	}

	return { wordIds: selectedWordIds, wordsTexts }
}
