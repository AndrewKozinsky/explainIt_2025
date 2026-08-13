import { videosService } from '@/entities/video/VideosService'
import ErrorMessage from '@/shared/ui/ErrorMessage/ErrorMessage'
import MediaPageContentWrapper from '@/shared/ui/media/MediaPageContentWrapper/MediaPageContentWrapper'
import VideoDetailsBreadCrumbs from '../VideoDetailsBreadCrumbs/VideoBreadCrumbs'
import { getHeaderAndSubHeader } from './fn/getHeaderAndSubHeader'
import PrivateVideoPart from './PrivateVideoPart'

type Props = {
	videoId: number | string
}

export default async function VideoDetailsPage({ videoId }: Props) {
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
			<PrivateVideoPart video={video} />
		</MediaPageContentWrapper>
	)
}
