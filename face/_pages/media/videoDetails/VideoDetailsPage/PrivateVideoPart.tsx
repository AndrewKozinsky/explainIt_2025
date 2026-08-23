// 'use client'

// import { useState, useCallback } from 'react'
// import { redirect } from 'next/navigation'
// import { useLocale } from 'next-intl'
// import type { VideoLiteModel } from '@/entities/video/repository/VideosRepository'
// import EditPrivateVideoForm from '@/entities/video/ui/editVideo/EditPrivateVideoForm/EditPrivateVideoForm'
// import { videosService } from '@/entities/video/VideosService'
// import { localizePath, pageUrls } from '@/shared/utils/pageUrls'

/*type PrivateVideoPartProps = {
	video: VideoLiteModel
}*/

/*export default function PrivateVideoPart(props: PrivateVideoPartProps) {
	const { video: initialVideo } = props
	const locale = useLocale()
	const [currentVideo, setCurrentVideo] = useState<VideoLiteModel>(initialVideo)

	const handleVideoUpdated = useCallback(
		async function () {
			const result = await videosService.getVideo(currentVideo.id)
			if (result.data) {
				setCurrentVideo(result.data)
			}
		},
		[currentVideo.id],
	)

	const handleCoverUpdated = useCallback(async function (updatedVideo: VideoLiteModel) {
		// Рефетчим с сервера чтобы получить свежий coverUrl
		const result = await videosService.getVideo(updatedVideo.id)
		if (result.data) {
			setCurrentVideo(result.data)
		} else {
			setCurrentVideo(updatedVideo)
		}
	}, [])

	const handleVideoDeleted = useCallback(
		function (_videoId: number) {
			redirect(localizePath(locale, pageUrls.videos.path))
		},
		[locale],
	)

	if (currentVideo.type !== 'private') {
		return null
	}

	return (
		<EditPrivateVideoForm
			video={currentVideo}
			onVideoUpdated={handleVideoUpdated}
			onCoverUpdated={handleCoverUpdated}
			onVideoDeleted={handleVideoDeleted}
		/>
	)
}*/
