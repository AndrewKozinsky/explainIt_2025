import { useMemo } from 'react'
import { useParams } from 'next/navigation'
import { extractVideoIdFromUrlVideoId, getVideoTypeByUrlVideoId } from '@/сonsts/pageUrls'
import { useVideosStore } from '_pages/video/videos/videosStore'
import { pageUrls } from 'сonsts/pageUrls'

export function useGetPageHeader() {
	const params = useParams() as { videoId?: string }
	const urlVideoId = params.videoId

	const publicVideo = useVideosStore((s) => s.publicVideo)
	const privateVideo = useVideosStore((s) => s.privateVideo)
	const publicVideos = useVideosStore((s) => s.publicVideos.data)
	const privateVideos = useVideosStore((s) => s.privateVideos.data)

	return useMemo(() => {
		// /videos
		if (!urlVideoId) return pageUrls.videos.name

		// /videos/:videoId
		const directName = publicVideo?.name ?? privateVideo?.name ?? null
		if (directName) return directName

		const videoType = getVideoTypeByUrlVideoId(urlVideoId)
		const videoId = extractVideoIdFromUrlVideoId(urlVideoId)

		if (videoType === 'public' && videoId != null) {
			return publicVideos.find((v) => v.id === videoId)?.name ?? pageUrls.videos.video(urlVideoId).name
		}

		if (videoType === 'private' && videoId != null) {
			return privateVideos.find((v) => v.id === videoId)?.name ?? pageUrls.videos.video(urlVideoId).name
		}

		return pageUrls.videos.video(urlVideoId).name
	}, [urlVideoId, publicVideo, privateVideo, publicVideos, privateVideos])
}
