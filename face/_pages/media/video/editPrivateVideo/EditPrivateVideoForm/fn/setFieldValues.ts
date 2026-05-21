import { useEffect } from 'react'
import { UseFormReset, UseFormSetValue } from 'react-hook-form'
import { useVideoPrivate_GetLazyQuery } from '@/graphql'
import { useVideoStore } from '_pages/media/video/videoStore'
import { ChangeVideoFormData } from '../fn/form'

export function useSetFieldValues(
	reset: UseFormReset<ChangeVideoFormData>,
	setValue: UseFormSetValue<ChangeVideoFormData>,
) {
	const videoId = useVideoStore((s) => s.privateVideo.data?.id)
	const [getVideo, { data, previousData }] = useVideoPrivate_GetLazyQuery()

	const video = data?.video_private_get
	const prevVideo = previousData?.video_private_get

	useEffect(() => {
		if (videoId) {
			getVideo({ variables: { input: { id: videoId } } })
		}
	}, [getVideo, videoId])

	useEffect(() => {
		if (!video) return

		// full form reset on ID change
		if (video.id !== prevVideo?.id) {
			reset({
				languageCode: video.languageCode ?? '',
				name: video.name ?? '',
				content: video.originalContent ?? '',
			})
		} else if (video.originalContent !== prevVideo?.originalContent) {
			// partial update only for content (subtitles)
			setValue('content', video.originalContent ?? '')
		}
	}, [video, prevVideo, reset, setValue])
}
