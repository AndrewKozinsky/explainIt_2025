import React from 'react'
import { useParams } from 'next/navigation'
import { useWatchingStore } from '_pages/video/watching/watchingStore'
import { pageUrls } from 'сonsts/pageUrls'

type BreadCrumbItem = {
	name: string
	path: string
}

export function useVideoBreadCrumbsItems(): BreadCrumbItem[] {
	const params = useParams() as { videoId?: string }
	const urlVideoId = params.videoId!

	/*return React.useMemo(() => {
		// /videos
		if (!urlVideoId) return []

		return [pageUrls.videos]
	}, [urlVideoId])*/

	const videoName = useWatchingStore((s) => s.video?.data?.name ?? undefined)

	return React.useMemo(() => {
		const videoUrl = pageUrls.videos.video(urlVideoId)

		return [pageUrls.books, { name: videoName ?? videoUrl.name, path: videoUrl.path }]
	}, [urlVideoId, videoName])
}
