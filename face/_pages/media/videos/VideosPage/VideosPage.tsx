import { VideosApi } from '@/entites/videos/repository/VideosApi'
import { BreadCrumbs } from '@/shared/ui/pageRelated/BreadCrumbs/BreadCrumbs'
import { fetchData } from '@/shared/utils/fetchData'
import { pageUrls } from '@/shared/utils/pageUrls'
import MediaPageContentWrapper from '_pages/media/commonComponents/MediaPageContentWrapper/MediaPageContentWrapper'
import { videoConfig } from '_pages/media/commonComponents/videoConfig'
import MediaItemsGrid from '../../commonComponents/mediaItemsGrid/MediaItemsGrid/MediaItemsGrid'
import { AddVideoButtonWrapper } from '../AddVideoButtonWrapper/AddVideoButtonWrapper'
import { getContentConfig } from './fn/getContentConfig'

export default async function VideosPage() {
	const api = new VideosApi()
	const { error, data } = await fetchData(() => api.getVideos())

	const config = data ? getContentConfig(data) : null

	return (
		<MediaPageContentWrapper breadCrumbs={<BreadCrumbs items={[]} />} header={pageUrls.videos.name}>
			<MediaItemsGrid
				loading={false}
				error={error}
				config={config}
				addButton={<AddVideoButtonWrapper />}
				defaultMediaName={videoConfig.newVideoEmptyName}
			/>
		</MediaPageContentWrapper>
	)
}
