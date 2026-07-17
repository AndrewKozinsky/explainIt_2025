// import type { VideoPrivateOutModel, VideoPublicOutModel } from '@/shared/api/generated/models'
// import { PopulatedTextStructure } from '../../common/populatedTextStructure'

/*export function createPopulatedPlainText(
	videoData: VideoPrivateOutModel | VideoPublicOutModel,
): PopulatedTextStructure.Structure {
	if (!videoData.processedContent || !videoData.sentences) {
		return {
			sentences: [],
		}
	}

	const text = videoData.processedContent as unknown as string
	const sortedSentences = [...videoData.sentences].sort((a, b) => a.orderIndex - b.orderIndex)

	return {
		sentences: sortedSentences.map((sentence) => {
			const start = Math.max(0, Math.min(text.length, sentence.startOffset))
			const end = Math.max(start, Math.min(text.length, sentence.startOffset + sentence.length))

			return {
				id: sentence.id,
				text: text.slice(start, end),
			}
		}),
	}
}*/
