'use client'

import { BreadCrumbs } from 'ui/pageRelated/BreadCrumbs/BreadCrumbs'
import MediaItemsGrid from '_pages/media/commonComponents/MediaItemsGrid/MediaItemsGrid'
import MediaPageContentWrapper from '_pages/media/commonComponents/MediaPageContentWrapper/MediaPageContentWrapper'
import { videoConfig } from '_pages/media/commonComponents/videoConfig'
import { useGetContentConfig } from './fn/getContentConfig'
import { useGetAddVideoConfig } from './fn/getOnAddVideoClick'
import { usePopulateVideosStore } from './fn/populateVideosStore'
import { pageUrls } from 'сonsts/pageUrls'

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
				defaultMediaName={videoConfig.emptyVideoName}
			/>
		</MediaPageContentWrapper>
	)
}

export default VideosPage
