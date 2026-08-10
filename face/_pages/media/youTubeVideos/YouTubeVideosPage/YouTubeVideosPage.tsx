// 'use client'

// import React from 'react'
import MediaPageContentTabs from '@/shared/ui/media/MediaPageContentTabs/MediaPageContentTabs'
import MediaPageContentWrapper from '@/shared/ui/media/MediaPageContentWrapper/MediaPageContentWrapper'
// import PrivateVideosListWithAdd from '@/entities/video/ui/PrivateVideosListWithAdd/PrivateVideosListWithAdd'
// import YouTubeVideosSaved from '@/entities/youtube/ui/YouTubeVideosSaved/YouTubeVideosSaved'
// import YouTubeVideosSearch from '@/entities/youtube/ui/YouTubeVideosSearch/YouTubeVideosSearch'
// import YouTubeVideosTabs from '@/entities/youtube/ui/YouTubeVideosTabs/YouTubeVideosTabs'
import { BreadCrumbs } from '@/shared/ui/pageRelated/BreadCrumbs/BreadCrumbs'
import { pageUrls } from '@/shared/utils/pageUrls'

function YouTubeVideosPage() {
	return (
		<MediaPageContentWrapper breadCrumbs={<BreadCrumbs items={[]} />} header={pageUrls.youtube.name}>
			<MediaPageContentTabs savedVideosSlot={<p />} userVideosSlot={<p />} youtubeSlot={<p />} />
			{/*<YouTubeVideosTabs
				savedVideosSlot={<YouTubeVideosSaved />}
				youtubeSlot={<YouTubeVideosSearch />}
				userVideosSlot={<PrivateVideosListWithAdd />}
			/>*/}
		</MediaPageContentWrapper>
	)
}

export default YouTubeVideosPage
