'use client'

import DetailsBlock from '@/entities/detailsBlock/ui/base/DetailsBlock/DetailsBlock'
import DictionaryContent from '@/entities/detailsBlock/ui/mediaSpecific/DictionaryContent/DictionaryContent'
import PhrasesContent from '@/entities/detailsBlock/ui/mediaSpecific/PhrasesContent/PhrasesContent'
import { useMediaTranslations } from '@/entities/media/model/useMediaTranslations'
import { MediaStoreProvider } from '@/entities/media/store/MediaStoreContext'
import MediaRoot from '@/entities/media/ui/MediaRoot/MediaRoot'
import VideoControls from '@/entities/videoControls/VideoControls/VideoControls'
import ErrorMessage from '@/shared/ui/ErrorMessage/ErrorMessage'
import ViewportSyncedHeight from '@/shared/ui/ViewportSyncedHeight/ViewportSyncedHeight'
import { pageUrls } from '@/shared/utils/pageUrls'
import RecommendedVideos from '@/widgets/video/RecommendedVideos/RecommendedVideos'
import { getHeader } from './fn/getHeader'
import { setupDeps } from './fn/setupDeps'
import { usePollVideoSubtitlesStatus } from './fn/usePollVideoSubtitlesStatus'
import { useVideoControls } from './fn/useVideoControls'
import { useVideoData } from './fn/useVideoData'
import VideoClientWrapper from './VideoClientWrapper'
import './VideoPage.scss'

const { useMediaStore } = setupDeps()

type VideoRootProps = {
	videoId: string
}

function VideoPage(props: VideoRootProps) {
	const { videoId } = props

	const { video, refetch, error } = useVideoData(videoId)

	const { selectedSentenceId, selectedWordId } = useMediaStore()

	const polledSubtitlesStatus = usePollVideoSubtitlesStatus(video?.id, video?.subtitlesStatus, refetch)

	useMediaTranslations({
		videoName: video?.name,
		languageCode: video?.languageCode,
		sentences: video?.plainSentences,
		selectedSentenceId,
		selectedWordId,
		mediaStore: useMediaStore,
	})

	const videoControls = useVideoControls()

	if (error) {
		return <ErrorMessage text={error} />
	}

	if (!video) {
		return null
	}

	const { header } = getHeader(video)

	return (
		<MediaStoreProvider store={useMediaStore}>
			<MediaRoot
				breadCrumbsConfig={[pageUrls.videos]}
				header={header}
				leftBlock={
					<VideoClientWrapper
						contentType={video.contentType}
						plainSentences={video.plainSentences}
						subtitles={video.subtitles}
						fileUrl={video.fileUrl ?? ''}
						youTubeVideoId={video.youtubeVideoId ?? ''}
						videoId={video.id}
						ratio={video.ratio}
						subtitlesStatus={polledSubtitlesStatus ?? video.subtitlesStatus}
						subtitlesErrorCode={video.subtitlesErrorCode}
						durationSeconds={video.durationSeconds}
					/>
				}
				rightBlock={
					<ViewportSyncedHeight extraClass='video-page__details-block' gapTop={10} gapBottom={10}>
						<DetailsBlock
							tabs={[
								{ type: 'dictionary', text: 'Словарь', content: <DictionaryContent /> },
								{ type: 'words', text: 'Фразы', content: <PhrasesContent /> },
							]}
						/>
						<VideoControls {...videoControls} />
					</ViewportSyncedHeight>
				}
				footer={video.youtubeVideoId && <RecommendedVideos videoId={videoId} />}
			/>
		</MediaStoreProvider>
	)
}

export default VideoPage
