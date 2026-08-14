'use client'

import { MediaPageClient } from '@/entities/detailsBlock/SelectionProvider/MediaPageClient'
import ErrorMessage from '@/shared/ui/ErrorMessage/ErrorMessage'
import { pageUrls } from '@/shared/utils/pageUrls'
import { getHeader } from './fn/getHeader'
import { usePollVideoSubtitlesStatus } from './fn/usePollVideoSubtitlesStatus'
import { useVideoData } from './fn/useVideoData'
import VideoClientWrapper from './VideoClientWrapper'

type VideoRootProps = {
	videoId: string
}

function VideoPage(props: VideoRootProps) {
	const { videoId } = props

	const { video, refetch, error } = useVideoData(videoId)

	usePollVideoSubtitlesStatus(video?.subtitlesStatus, refetch)

	if (error) {
		return <ErrorMessage text={error} />
	}

	if (!video) {
		return null
	}

	const { header } = getHeader(video)

	return (
		<MediaPageClient
			breadCrumbsConfig={[pageUrls.videos]}
			header={header}
			leftBlock={
				<VideoClientWrapper
					languageCode={video.languageCode}
					contentType={video.contentType}
					plainSentences={video.plainSentences}
					subtitles={video.subtitles}
					fileUrl={video.fileUrl ?? ''}
					youTubeVideoId={video.youtubeVideoId ?? ''}
					videoId={video.id}
					ratio={video.ratio}
					subtitlesStatus={video.subtitlesStatus}
					subtitlesErrorCode={video.subtitlesErrorCode}
				/>
			}
			detailsBlockMetadata={{
				bookName: null,
				bookAuthor: null,
				chapterId: null,
				videoId: video.id,
				videoName: video.name,
				languageCode: video.languageCode,
				sentences: video.plainSentences,
			}}
		/>
	)
}

export default VideoPage
