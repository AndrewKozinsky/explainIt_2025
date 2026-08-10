'use client'

import React from 'react'
import dynamic from 'next/dynamic'
import MediaPageContentWrapper from '@/shared/ui/media/MediaPageContentWrapper/MediaPageContentWrapper'
import { BreadCrumbs } from '@/shared/ui/pageRelated/BreadCrumbs/BreadCrumbs'
import { pageUrls } from '@/shared/utils/pageUrls'
import { useYouTubeVideosPageTabs } from './fn/useYouTubeVideosPageTabs'

const MediaPageContentTabs = dynamic(() => import('@/shared/ui/media/MediaPageContentTabs/MediaPageContentTabs'), {
	ssr: false,
})

export default function YouTubeVideosPage() {
	const { defaultTab, onTabChange } = useYouTubeVideosPageTabs()

	return (
		<MediaPageContentWrapper breadCrumbs={<BreadCrumbs items={[]} />} header={pageUrls.youtube.name}>
			<MediaPageContentTabs
				tabs={[
					{ key: 'saved', label: 'Подборка', content: <p /> },
					{ key: 'youtube', label: 'Поиск', content: <p /> },
					{ key: 'user', label: 'Мои видео', content: <p /> },
				]}
				defaultTab={defaultTab}
				onTabChange={onTabChange}
			/>
		</MediaPageContentWrapper>
	)
}
