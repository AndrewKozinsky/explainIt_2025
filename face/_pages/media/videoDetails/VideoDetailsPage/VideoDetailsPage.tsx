import MediaPageContentWrapper from '@/entities/media/ui/MediaPageContentWrapper/MediaPageContentWrapper'
import { VideosApi } from '@/entities/video/repository/VideosApi'
import { VideosService } from '@/entities/video/VideosService'
import ErrorMessage from '@/shared/ui/ErrorMessage/ErrorMessage'
import VideoDetailsBreadCrumbs from '../VideoDetailsBreadCrumbs/VideoBreadCrumbs'
import { getHeaderAndSubHeader } from './fn/getHeaderAndSubHeader'
import PrivateVideoPart from './PrivateVideoPart'
import PublicVideoPart from './PublicVideoPart'

type Props = {
	videoId: number | string
}

export default async function VideoDetailsPage({ videoId }: Props) {
	const videosService = new VideosService(new VideosApi())
	const { error, data: video } = await videosService.getVideo(videoId)

	if (error) {
		return <ErrorMessage text={error} />
	}

	if (!video) {
		return <ErrorMessage text='Видео не найдено' />
	}

	const { header } = getHeaderAndSubHeader(video)

	return (
		<MediaPageContentWrapper breadCrumbs={<VideoDetailsBreadCrumbs />} header={header}>
			<PublicVideoPart video={video} />
			<PrivateVideoPart video={video} />
		</MediaPageContentWrapper>
	)
}
