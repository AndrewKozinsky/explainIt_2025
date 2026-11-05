'use client'

import { useTranslations } from 'next-intl'
import MediaPageContentTabs from '@/shared/ui/media/MediaPageContentTabs/MediaPageContentTabs'
import MediaPageContentWrapper from '@/shared/ui/media/MediaPageContentWrapper/MediaPageContentWrapper'
import { BreadCrumbs } from '@/shared/ui/pageRelated/BreadCrumbs/BreadCrumbs'
import { pageUrls } from '@/shared/utils/pageUrls'
import PrivateVideosListWithAdd from '@/widgets/privateVideo/PrivateVideosListWithAdd/PrivateVideosListWithAdd'
import VideosCollection from '@/widgets/videosCollection/ui/VideosCollection/VideosCollection'
import YouTubeVideosSearch from '@/widgets/youTubeVideosSearch/ui/YouTubeVideosSearch/YouTubeVideosSearch'
import { useVideosPageTabs } from './fn/useVideosPageTabs'

export default function VideosPage() {
	const t = useTranslations('pageUrls')
	const { defaultTab, onTabChange } = useVideosPageTabs()

	return (
		<MediaPageContentWrapper breadCrumbs={<BreadCrumbs items={[]} />} header={t(pageUrls.videos.nameKey)}>
			<MediaPageContentTabs
				tabs={[
					{ key: 'saved', label: 'Подборка', content: <VideosCollection /> },
					{ key: 'youtube', label: 'Поиск', content: <YouTubeVideosSearch /> },
					{ key: 'user', label: 'Мои видео', content: <PrivateVideosListWithAdd /> },
				]}
				defaultTab={defaultTab}
				onTabChange={onTabChange}
			/>
		</MediaPageContentWrapper>
	)
}
