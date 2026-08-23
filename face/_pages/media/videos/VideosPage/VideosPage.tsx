'use client'

import MediaPageContentTabs from '@/shared/ui/media/MediaPageContentTabs/MediaPageContentTabs'
import MediaPageContentWrapper from '@/shared/ui/media/MediaPageContentWrapper/MediaPageContentWrapper'
import { BreadCrumbs } from '@/shared/ui/pageRelated/BreadCrumbs/BreadCrumbs'
import { pageUrls } from '@/shared/utils/pageUrls'
// import PrivateVideosListWithAdd from '@/widgets/video/PrivateVideosListWithAdd/PrivateVideosListWithAdd'
import YouTubeVideosSearch from '@/widgets/video/-/YouTubeVideosSearch/YouTubeVideosSearch'
import VideosCollection from '@/widgets/videosCollection/ui/VideosCollection/VideosCollection'
import { useVideosPageTabs } from './fn/useVideosPageTabs'

export default function VideosPage() {
	const { defaultTab, onTabChange } = useVideosPageTabs()

	return (
		<MediaPageContentWrapper breadCrumbs={<BreadCrumbs items={[]} />} header={pageUrls.videos.name}>
			<MediaPageContentTabs
				tabs={[
					{ key: 'saved', label: 'Подборка', content: <VideosCollection /> },
					{ key: 'youtube', label: 'Поиск', content: <YouTubeVideosSearch /> },
					/*{ key: 'user', label: 'Мои видео', content: <PrivateVideosListWithAdd /> },*/
				]}
				defaultTab={defaultTab}
				onTabChange={onTabChange}
			/>
		</MediaPageContentWrapper>
	)
}
