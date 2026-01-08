import { PopulatedSubtitlesStructure } from '_pages/video/watching/common/populatedSubtitlesStructure'
import { useWatchingStore } from '_pages/video/watching/watchingStore'
import { useEffect } from 'react'

export function useUpdateRootSelectedText() {
	const populatedSubtitles = useWatchingStore((s) => s.populatedSubtitles)

	const updateSelectedText = useWatchingStore((s) => s.updateSelectedText)

	useEffect(
		function () {
			updateFromSubtitlesSelected(populatedSubtitles, updateSelectedText)
		},
		[populatedSubtitles, updateSelectedText],
	)
}

function updateFromSubtitlesSelected(
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

	const sentence = subtitle.texts.map((text) => textPartsToString(text.textParts)).join(' ')

	const words: string[] = []
	for (const text of subtitle.texts) {
		for (const part of text.textParts) {
			if (part.type !== 'word') continue
			if (!wordIds.includes(part.id)) continue

			words.push(part.value)
		}
	}

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

function isSubtitleById(subtitleId: number) {
	return function (
		subtitleOrBar: PopulatedSubtitlesStructure.Subtitle | PopulatedSubtitlesStructure.SpeechlessBar,
	): subtitleOrBar is PopulatedSubtitlesStructure.Subtitle {
		return subtitleOrBar.type === 'subtitle' && subtitleOrBar.id === subtitleId
	}
}
