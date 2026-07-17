// import { useCallback, useContext, useState } from 'react'
// import { useQueryClient } from '@tanstack/react-query'
// import {
// 	useVideoPrivateControllerUpdateVideoPrivate,
// 	getVideoPrivateControllerGetUserVideosPrivateQueryKey,
// 	getVideoPrivateControllerGetVideoPrivateQueryKey,
// } from '@/shared/api/generated/video-private/video-private'
// import type { UpdateVideoDtoLanguageCode } from '@/shared/api/generated/models'
// import { NotificationContext } from '@/shared/ui/Notification/fn/context'
// import { useVideoStore } from '_pages/media/video/videoStore'

/*export function useGetDeleteVideoFile() {
	const { notify } = useContext(NotificationContext)
	const [status, setStatus] = useState<'idle' | 'loading'>('idle')

	const { mutateAsync: updateVideo } = useVideoPrivateControllerUpdateVideoPrivate()
	const queryClient = useQueryClient()

	const onDeleteFileClick = useCallback(
		async function () {
			const video = useVideoStore.getState().privateVideo.data
			if (!video) return

			setStatus('loading')

			// Include existing languageCode to satisfy server-side validation rules
			const data: {
				fileName: null
				languageCode?: UpdateVideoDtoLanguageCode | null
			} = {
				fileName: null,
			}
			if (video.languageCode) data.languageCode = video.languageCode as unknown as UpdateVideoDtoLanguageCode

			try {
				await updateVideo({
					id: video.id,
					data,
				})

				queryClient.invalidateQueries({ queryKey: getVideoPrivateControllerGetUserVideosPrivateQueryKey() })
				queryClient.invalidateQueries({ queryKey: getVideoPrivateControllerGetVideoPrivateQueryKey(video.id) })

				setStatus('idle')
			} catch {
				notify({
					type: 'error',
					message:
						'Не удалось удалить видео. Попробуйте ещё раз или сообщите о проблеме в форме обратной связи.',
				})
			}
		},
		[updateVideo, notify, queryClient],
	)

	return {
		status,
		onDeleteFileClick,
	}
}*/
