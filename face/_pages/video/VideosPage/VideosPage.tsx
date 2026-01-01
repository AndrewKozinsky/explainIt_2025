'use client'

import { useGetShowingPageType } from './fn/showingPageType'
import VideosRoot from '_pages/video/videos/VideosRoot/VideosRoot'
import WatchingRoot from '_pages/video/watching/ReadingRoot/WatchingRoot'

function VideosPage() {
	const showingPageType = useGetShowingPageType()

	const pageMapper = {
		videos: <VideosRoot />,
		watching: <WatchingRoot />,
	}

	return pageMapper[showingPageType]
}

export default VideosPage
