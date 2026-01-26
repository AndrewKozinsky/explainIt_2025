import { VideoPrivateOutModel } from '@/graphql'
import { PopulatedTextStructure } from '_pages/video/watching/common/populatedTextStructure'

export function createPopulatedPlainText(videoData: VideoPrivateOutModel): PopulatedTextStructure.Structure {
	if (!videoData.processedContent || !videoData.sentences) {
		return {
			sentences: [],
		}
	}

	const text = videoData.processedContent
	const sortedSentences = [...videoData.sentences].sort((a, b) => a.orderIndex - b.orderIndex)

	return {
		sentences: sortedSentences.map((sentence) => {
			const start = Math.max(0, Math.min(text.length, sentence.startOffset))
			const end = Math.max(start, Math.min(text.length, sentence.startOffset + sentence.length))

			return {
				id: sentence.id,
				text: text.slice(start, end),
				// translation: resolvedSentence.t,
			}
		}),
	}
}
