'use client'

import DetailsBlock from '@/entities/detailsBlock/DetailsBlock/DetailsBlock'
import MediaRoot from '@/entities/media/ui/MediaRoot/MediaRoot'
import ErrorMessage from '@/shared/ui/ErrorMessage/ErrorMessage'
import { pageUrls } from '@/shared/utils/pageUrls'
import RecommendedVideos from '@/widgets/video/RecommendedVideos/RecommendedVideos'
import { getHeader } from './fn/getHeader'
import { usePollVideoSubtitlesStatus } from './fn/usePollVideoSubtitlesStatus'
import { useVideoData } from './fn/useVideoData'
import VideoClientWrapper from './VideoClientWrapper'
import { setupDeps } from './fn/setupDeps'

const { useMediaStore } = setupDeps()

type VideoRootProps = {
	videoId: string
}

function VideoPage(props: VideoRootProps) {
	const { videoId } = props

	const { video, refetch, error } = useVideoData(videoId)

	usePollVideoSubtitlesStatus(video?.id, video?.subtitlesStatus, refetch)

	const { selectedSentenceId, selectedWordId, selectWord } = useMediaStore()

	if (error) {
		return <ErrorMessage text={error} />
	}

	if (!video) {
		return null
	}

	const { header } = getHeader(video)

	return (
		<MediaRoot
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
					durationSeconds={video.durationSeconds}
					selectedSentenceId={selectedSentenceId}
					selectedWordId={selectedWordId}
					selectWord={selectWord}
				/>
			}
			rightBlock={
				<DetailsBlock
					bookName={null}
					bookAuthor={null}
					chapterId={null}
					videoId={video.id}
					videoName={video.name}
					languageCode={video.languageCode}
					sentences={video.plainSentences}
					selectedSentenceId={selectedSentenceId}
					selectedWordId={selectedWordId}
				/>
			}
			footer={video.youtubeVideoId && <RecommendedVideos videoId={videoId} />}
		/>
	)
}

export default VideoPage
