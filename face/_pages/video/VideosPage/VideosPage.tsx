'use client'

import WatchingRoot from '_pages/video/watching/WatchingRoot/WatchingRoot'
import VideosRoot from '../videos/root/VideosRoot/VideosRoot'
import { useGetShowingPageType } from './fn/showingPageType'

function VideosPage() {
	const showingPageType = useGetShowingPageType()

	const pageMapper = {
		videos: <VideosRoot />,
		watching: <WatchingRoot />,
	}

	return pageMapper[showingPageType]
}

export default VideosPage
