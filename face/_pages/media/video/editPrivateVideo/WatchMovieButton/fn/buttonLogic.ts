import { useCallback, useEffect, useState } from 'react'
import { redirect } from 'next/navigation'
import { useLocale } from 'next-intl'
import { createMediaIdUrl, pageUrls } from '@/utils/pageUrls'
import { localizePath } from '@/utils/pageUrls'
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
	const locale = useLocale()

	return useCallback(
		function () {
			if (!privateVideo) return

			const videoIdInUrl = createMediaIdUrl(privateVideo.id, 'private')
			redirect(localizePath(locale, pageUrls.videos.video(videoIdInUrl).watching.path))
		},
		[privateVideo, locale],
	)
}
