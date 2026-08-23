import { videosService } from '@/entities/video/VideosService'
import ErrorMessage from '@/shared/ui/ErrorMessage/ErrorMessage'
import MediaPageContentWrapper from '@/shared/ui/media/MediaPageContentWrapper/MediaPageContentWrapper'
import { BreadCrumbs } from '@/shared/ui/pageRelated/BreadCrumbs/BreadCrumbs'
import { pageUrls } from '@/shared/utils/pageUrls'
import PrivateVideo from '@/widgets/privateVideo/PrivateVideo/PrivateVideo'
import { getHeaderAndSubHeader } from './fn/getHeaderAndSubHeader'

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
		<MediaPageContentWrapper breadCrumbs={<BreadCrumbs items={[pageUrls.videos]} />} header={header}>
			<PrivateVideo video={video} />
		</MediaPageContentWrapper>
	)
}
