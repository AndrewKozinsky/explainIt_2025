'use client'

import { MediaPageClient } from '@/entities/detailsBlock/SelectionProvider/MediaPageClient'
import ErrorMessage from '@/shared/ui/ErrorMessage/ErrorMessage'
import { pageUrls } from '@/shared/utils/pageUrls'
import { getHeader } from './fn/getHeader'
import { useYouTubeVideoData } from './fn/useYouTubeVideoData'
import YouTubeVideoClientWrapper from './YouTubeVideoClientWrapper'

type VideoRootProps = {
	videoId: string
}

function YouTubeVideoPage(props: VideoRootProps) {
	const { videoId } = props

	const { error, video } = useYouTubeVideoData(videoId)

	if (error) {
		return <ErrorMessage text={error} />
	}

	if (!video) {
		return null
	}

	const { header } = getHeader(video)

	return (
		<MediaPageClient
			breadCrumbsConfig={[pageUrls.youtube]}
			header={header}
			leftBlock={
				<YouTubeVideoClientWrapper
					languageCode={video.languageCode}
					contentType={video.contentType}
					plainSentences={video.plainSentences}
					subtitles={video.subtitles}
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

export default YouTubeVideoPage
