import MediaPageContentWrapper from '@/entites/media/ui/MediaPageContentWrapper/MediaPageContentWrapper'
import { VideosApi } from '@/entites/videos/repository/VideosApi'
import PublicVideosList from '@/entites/videos/ui/PublicVideosList/PublicVideosList'
import { VideosService } from '@/entites/videos/VideosService'
import ErrorMessage from '@/shared/ui/ErrorMessage/ErrorMessage'
import { BreadCrumbs } from '@/shared/ui/pageRelated/BreadCrumbs/BreadCrumbs'
import { errorMessages } from '@/shared/utils/fetchData/errorMessages'
import { pageUrls } from '@/shared/utils/pageUrls'
import { PrivateVideosListWithAdd } from '_pages/media/videos/PrivateVideoListWithAdd/PrivateVideoListWithAdd'
import './VideosPage.scss'

export default async function VideosPage() {
	const videosService = new VideosService(new VideosApi())
	const { error, errors, data: allVideos } = await videosService.getVideos()

	if (error || errors) {
		return <ErrorMessage text={error ?? errorMessages.unknownServerError} />
	}

	return (
		<MediaPageContentWrapper breadCrumbs={<BreadCrumbs items={[]} />} header={pageUrls.videos.name}>
			<div className='videos-page'>
				<PrivateVideosListWithAdd videos={allVideos.private} />
				<PublicVideosList videos={allVideos.public} />
			</div>
		</MediaPageContentWrapper>
	)
}
