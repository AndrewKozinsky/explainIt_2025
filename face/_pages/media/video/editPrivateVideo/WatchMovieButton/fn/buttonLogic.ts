import { useCallback, useEffect, useState } from 'react'
import { redirect } from 'next/navigation'
import { createMediaIdUrl, pageUrls } from '@/сonsts/pageUrls'
import { useVideoStore } from '_pages/media/video/videoStore'

export function useIsWatchButtonDisabled() {
	const video = useVideoStore((s) => s.privateVideo.data)
	const [isReadButtonDisabled, setIsReadButtonDisabled] = useState(true)

	useEffect(
		function () {
			const isFileUploaded = video?.isFileUploaded
			const hasText = !!video?.originalContent

			setIsReadButtonDisabled(!isFileUploaded || !hasText)
		},
		[video],
	)

	return isReadButtonDisabled
}

export function useGetOnWatchButtonClick() {
	const privateVideo = useVideoStore((s) => s.privateVideo.data)

	return useCallback(
		function () {
			if (!privateVideo) return

			const videoIdInUrl = createMediaIdUrl(privateVideo.id, 'private')
			redirect(pageUrls.videos.video(videoIdInUrl).watching.path)
		},
		[privateVideo],
	)
}
