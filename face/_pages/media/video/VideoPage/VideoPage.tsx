import { MediaPageClient } from '@/entites/detailsBlock/SelectionProvider/MediaPageClient'
import { VideosApi } from '@/entites/videos/repository/VideosApi'
import { VideosService } from '@/entites/videos/VideosService'
import ErrorMessage from '@/shared/ui/ErrorMessage/ErrorMessage'
import { pageUrls } from '@/shared/utils/pageUrls'
import { getHeader } from './fn/getHeader'
import VideoClientWrapper from './VideoClientWrapper'

type VideoRootProps = {
	videoId: number | string
}

async function VideoPage(props: VideoRootProps) {
	const { videoId } = props

	const videosService = new VideosService(new VideosApi())
	const { error: videoError, data: videoData } = await videosService.getVideo(videoId)

	if (videoError) {
		return <ErrorMessage text={videoError} />
	}

	const { header } = getHeader(videoData)

	return (
		<MediaPageClient
			breadCrumbsConfig={[{ name: pageUrls.videos.name, path: pageUrls.videos.path }]}
			header={header}
			leftBlock={
				<VideoClientWrapper
					languageCode={videoData.languageCode}
					contentType={videoData.contentType}
					plainSentences={videoData.plainSentences}
					subtitles={videoData.subtitles}
					fileUrl={videoData.fileUrl ?? ''}
					videoId={videoData.id}
					subtitlesStatus={videoData.subtitlesStatus}
					subtitlesErrorCode={videoData.subtitlesErrorCode}
				/>
			}
			detailsBlockMetadata={{
				videoId: videoData.id,
				videoName: videoData.name,
				languageCode: videoData.languageCode,
				sentences: videoData.plainSentences,
			}}
		/>
	)
}

export default VideoPage
