import { useEffect, useRef } from 'react'
import { UseFormReset, UseFormSetValue } from 'react-hook-form'
import type { VideoPrivateOutModel } from '@/shared/api/generated/models'
import { useVideoPrivateControllerGetVideoPrivate } from '@/shared/api/generated/video-private/video-private'
import { useVideoStore } from '_pages/media/video/videoStore'
import { ChangeVideoFormData } from '../fn/form'

export function useSetFieldValues(
	reset: UseFormReset<ChangeVideoFormData>,
	setValue: UseFormSetValue<ChangeVideoFormData>,
) {
	const videoId = useVideoStore((s) => s.privateVideo.data?.id)
	const prevVideoIdRef = useRef<number | undefined>(undefined)
	const prevContentRef = useRef<string | undefined>(undefined)

	const { data } = useVideoPrivateControllerGetVideoPrivate(videoId!, {
		query: { enabled: !!videoId },
	})

	const video = data as unknown as VideoPrivateOutModel | undefined

	useEffect(
		function () {
			if (!video) return

			const currentContent = (video.originalContent as unknown as string) ?? ''

			// full form reset on ID change
			if (video.id !== prevVideoIdRef.current) {
				reset({
					languageCode: (video.languageCode as unknown as string) ?? '',
					name: (video.name as unknown as string) ?? '',
					content: currentContent,
				})
				prevVideoIdRef.current = video.id
				prevContentRef.current = currentContent
			} else if (currentContent !== prevContentRef.current) {
				// partial update only for content (subtitles)
				setValue('content', currentContent)
				prevContentRef.current = currentContent
			}
		},
		[video, reset, setValue],
	)
}
