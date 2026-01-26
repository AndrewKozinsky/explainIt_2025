import { VideoPrivateOutModel } from '@/graphql'
import { PopulatedSubtitlesStructure } from '_pages/video/watching/common/populatedSubtitlesStructure'
import { PopulatedTextStructure } from '_pages/video/watching/common/populatedTextStructure'
// import { ResolvedSubtitlesStructure } from '_pages/video/watching/common/resolvedSubtitlesStructure'
// import { ResolvedTextStructure } from '_pages/video/watching/common/resolvedTextStructure'
// import { sentenceToParts } from './sentenceToParts'

export function createPopulatedPlainText(videoData: VideoPrivateOutModel): PopulatedTextStructure.Structure {
	if (!videoData.sentences) {
		return {
			sentences: [],
		}
	}

	return {
		sentences: videoData.sentences.map((sentence, i) => {
			return {
				id: i,
				text: 'text here',
				// translation: resolvedSentence.t,
			}
		}),
	}
}
