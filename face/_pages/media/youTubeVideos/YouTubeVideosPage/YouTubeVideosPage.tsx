'use client'

// import React from 'react'
import MediaPageContentTabs from '@/shared/ui/media/MediaPageContentTabs/MediaPageContentTabs'
import MediaPageContentWrapper from '@/shared/ui/media/MediaPageContentWrapper/MediaPageContentWrapper'
// import PrivateVideosListWithAdd from '@/entities/video/ui/PrivateVideosListWithAdd/PrivateVideosListWithAdd'
// import YouTubeVideosSaved from '@/entities/youtube/ui/YouTubeVideosSaved/YouTubeVideosSaved'
// import YouTubeVideosSearch from '@/entities/youtube/ui/YouTubeVideosSearch/YouTubeVideosSearch'
// import YouTubeVideosTabs from '@/entities/youtube/ui/YouTubeVideosTabs/YouTubeVideosTabs'
import { BreadCrumbs } from '@/shared/ui/pageRelated/BreadCrumbs/BreadCrumbs'
import { pageUrls } from '@/shared/utils/pageUrls'
import { YOUTUBE_TABS, useYouTubeVideosPageTabs } from './fn/useYouTubeVideosPageTabs'

export default function YouTubeVideosPage() {
	const { defaultTab, onTabChange } = useYouTubeVideosPageTabs()

	return (
		<MediaPageContentWrapper breadCrumbs={<BreadCrumbs items={[]} />} header={pageUrls.youtube.name}>
			<MediaPageContentTabs tabs={YOUTUBE_TABS} defaultTab={defaultTab} onTabChange={onTabChange} />
			{/*<YouTubeVideosTabs
				savedVideosSlot={<YouTubeVideosSaved />}
				youtubeSlot={<YouTubeVideosSearch />}
				userVideosSlot={<PrivateVideosListWithAdd />}
			/>*/}
		</MediaPageContentWrapper>
	)
}
