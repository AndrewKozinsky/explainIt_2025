// import { MediaPageClient } from '@/entities/detailsBlock/SelectionProvider/MediaPageClient'
// import { VideosApi } from '@/entities/video/repository/VideosApi'
// import { VideosService } from '@/entities/video/VideosService'
// import ErrorMessage from '@/shared/ui/ErrorMessage/ErrorMessage'
// import { pageUrls } from '@/shared/utils/pageUrls'
// import { getHeader } from './fn/getHeader'
// import VideoClientWrapper from './VideoClientWrapper'
import { videosService } from '@/entities/video/VideosService'

type VideoRootProps = {
	videoId: number | string
}

async function VideoPage(props: VideoRootProps) {
	const { videoId } = props

	const { error: videoError, data: videoData } = await videosService.getVideo(videoId)

	/*if (videoError) {
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
	)*/
	return null
}

export default VideoPage
