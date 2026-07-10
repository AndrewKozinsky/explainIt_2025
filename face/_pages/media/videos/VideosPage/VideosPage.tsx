'use client'

import { pageUrls } from 'utils/pageUrls'
import { BreadCrumbs } from '@/shared/ui/pageRelated/BreadCrumbs/BreadCrumbs'
import MediaPageContentWrapper from '_pages/media/commonComponents/MediaPageContentWrapper/MediaPageContentWrapper'
import { videoConfig } from '_pages/media/commonComponents/videoConfig'
import MediaItemsGrid from '../../commonComponents/mediaItemsGrid/MediaItemsGrid/MediaItemsGrid'
import { useGetContentConfig } from './fn/getContentConfig'
import { useGetAddVideoConfig } from './fn/getOnAddVideoClick'
import { usePopulateVideosStore } from './fn/populateVideosStore'

function VideosPage() {
	usePopulateVideosStore()

	const contentConfig = useGetContentConfig()
	const addVideoConfig = useGetAddVideoConfig()

	return (
		<MediaPageContentWrapper breadCrumbs={<BreadCrumbs items={[]} />} header={pageUrls.videos.name}>
			<MediaItemsGrid
				loading={contentConfig.loading}
				error={contentConfig.error}
				config={contentConfig.config}
				addMediaButtonConfig={addVideoConfig}
				defaultMediaName={videoConfig.newVideoEmptyName}
			/>
		</MediaPageContentWrapper>
	)
}

export default VideosPage
