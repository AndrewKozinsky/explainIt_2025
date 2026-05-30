import React from 'react'
import { useParams } from 'next/navigation'
import { videoConfig } from '_pages/media/commonComponents/videoConfig'
import { useWatchingStore } from '_pages/media/watching/watchingStore'
import { pageUrls } from 'сonsts/pageUrls'

type BreadCrumbItem = {
	name: string
	path: string
}

export function useVideoBreadCrumbsItems(): BreadCrumbItem[] {
	const params = useParams() as { videoId?: string }
	const urlVideoId = params.videoId!

	const videoName = useWatchingStore((s) => s.video?.data?.name)

	return React.useMemo(() => {
		const videoUrl = pageUrls.videos.video(urlVideoId)

		const movieName = videoName ? videoName : videoConfig.defaultName

		return [pageUrls.videos, { name: movieName, path: videoUrl.path }]
	}, [urlVideoId, videoName])
}
