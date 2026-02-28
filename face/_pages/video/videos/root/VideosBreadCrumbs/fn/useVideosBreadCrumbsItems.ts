import React from 'react'
import { useParams } from 'next/navigation'
import { pageUrls } from 'сonsts/pageUrls'

type BreadCrumbItem = {
	name: string
	path: string
}

export function useVideosBreadCrumbsItems(): BreadCrumbItem[] {
	const params = useParams() as { videoId?: string }
	const urlVideoId = params.videoId

	return React.useMemo(() => {
		// /videos
		if (!urlVideoId) return []

		return [pageUrls.videos]
	}, [urlVideoId])
}
