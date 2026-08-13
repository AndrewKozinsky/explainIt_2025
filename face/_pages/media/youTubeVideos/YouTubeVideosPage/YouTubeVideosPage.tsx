'use client'

import MediaPageContentTabs from '@/shared/ui/media/MediaPageContentTabs/MediaPageContentTabs'
import MediaPageContentWrapper from '@/shared/ui/media/MediaPageContentWrapper/MediaPageContentWrapper'
import { BreadCrumbs } from '@/shared/ui/pageRelated/BreadCrumbs/BreadCrumbs'
import { pageUrls } from '@/shared/utils/pageUrls'
import PrivateVideosListWithAdd from '@/widgets/video/PrivateVideosListWithAdd/PrivateVideosListWithAdd'
import YouTubeVideosSaved from '@/widgets/video/YouTubeVideosSaved/YouTubeVideosSaved'
import YouTubeVideosSearch from '@/widgets/video/YouTubeVideosSearch/YouTubeVideosSearch'
import { useYouTubeVideosPageTabs } from './fn/useYouTubeVideosPageTabs'

export default function YouTubeVideosPage() {
	const { defaultTab, onTabChange } = useYouTubeVideosPageTabs()

	return (
		<MediaPageContentWrapper breadCrumbs={<BreadCrumbs items={[]} />} header={pageUrls.youtube.name}>
			<MediaPageContentTabs
				tabs={[
					{ key: 'saved', label: 'Подборка', content: <YouTubeVideosSaved /> },
					{ key: 'youtube', label: 'Поиск', content: <YouTubeVideosSearch /> },
					{ key: 'user', label: 'Мои видео', content: <PrivateVideosListWithAdd /> },
				]}
				defaultTab={defaultTab}
				onTabChange={onTabChange}
			/>
		</MediaPageContentWrapper>
	)
}
