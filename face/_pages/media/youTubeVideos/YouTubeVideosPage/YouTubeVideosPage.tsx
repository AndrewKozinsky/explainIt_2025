'use client'

import YouTubeVideosSearch from '@/entities/youtube/ui/YouTubeVideosSearch/YouTubeVideosSearch'
import MediaPageContentTabs from '@/shared/ui/media/MediaPageContentTabs/MediaPageContentTabs'
import MediaPageContentWrapper from '@/shared/ui/media/MediaPageContentWrapper/MediaPageContentWrapper'
// import PrivateVideosListWithAdd from '@/entities/video/ui/PrivateVideosListWithAdd/PrivateVideosListWithAdd'
// import YouTubeVideosTabs from '@/entities/youtube/ui/YouTubeVideosTabs/YouTubeVideosTabs'
import { BreadCrumbs } from '@/shared/ui/pageRelated/BreadCrumbs/BreadCrumbs'
import { pageUrls } from '@/shared/utils/pageUrls'
import YouTubeVideosSaved from '@/widgets/video/YouTubeVideosSaved/YouTubeVideosSaved'
import { useYouTubeVideosPageTabs } from './fn/useYouTubeVideosPageTabs'

export default function YouTubeVideosPage() {
	const { defaultTab, onTabChange } = useYouTubeVideosPageTabs()

	return (
		<MediaPageContentWrapper breadCrumbs={<BreadCrumbs items={[]} />} header={pageUrls.youtube.name}>
			<MediaPageContentTabs
				tabs={[
					{ key: 'saved', label: 'Подборка', content: <YouTubeVideosSaved /> },
					{ key: 'youtube', label: 'Поиск', content: <YouTubeVideosSearch /> },
					{ key: 'user', label: 'Мои видео', content: <p /> },
				]}
				defaultTab={defaultTab}
				onTabChange={onTabChange}
			/>
			{/*<YouTubeVideosTabs
				savedVideosSlot={<YouTubeVideosSaved />}
				youtubeSlot={}
				userVideosSlot={<PrivateVideosListWithAdd />}
			/>*/}
		</MediaPageContentWrapper>
	)
}
