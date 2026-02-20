import { useCallback, useEffect, useState } from 'react'
import { redirect } from 'next/navigation'
import { createVideoIdUrl, pageUrls } from '@/сonsts/pageUrls'
import { useVideosStore } from '_pages/video/videos/videosStore'

export function useIsWatchButtonDisabled() {
	const video = useVideosStore((s) => s.privateVideo)
	const [isReadButtonDisabled, setIsReadButtonDisabled] = useState(true)

	useEffect(
		function () {
			const isFileUploaded = !!video?.isFileUploaded

			setIsReadButtonDisabled(!isFileUploaded)
		},
		[video],
	)

	return isReadButtonDisabled
}

export function useGetOnWatchButtonClick() {
	const privateVideo = useVideosStore((s) => s.privateVideo)

	return useCallback(
		function () {
			if (!privateVideo) return

			const videoIdInUrl = createVideoIdUrl(privateVideo.id, 'private')
			redirect(pageUrls.videos.video(videoIdInUrl).watching.path)
		},
		[privateVideo],
	)
}
