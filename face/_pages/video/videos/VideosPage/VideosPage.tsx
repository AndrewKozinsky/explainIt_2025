'use client'

import MediaItemsGrid from '_pages/bookAndVideoCommon/MediaItemsGrid/MediaItemsGrid'
import MediaPageContentWrapper from '_pages/bookAndVideoCommon/MediaPageContentWrapper/MediaPageContentWrapper'
import { videoConfig } from '../common/videoConfig'
import VideosBreadCrumbs from '../root/VideosBreadCrumbs/VideosBreadCrumbs'
import { useGetContentConfig } from './fn/getContentConfig'
import { useGetAddVideoConfig } from './fn/getOnAddVideoClick'
import { usePopulateVideosStore } from './fn/populateVideosStore'
import { pageUrls } from 'сonsts/pageUrls'

function VideosPage() {
	usePopulateVideosStore()

	const contentConfig = useGetContentConfig()
	const addVideoConfig = useGetAddVideoConfig()

	return (
		<MediaPageContentWrapper breadCrumbs={<VideosBreadCrumbs />} header={pageUrls.videos.name}>
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
