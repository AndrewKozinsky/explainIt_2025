import { useCallback, useContext, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from '@/i18n/routing'
import { useVideoPrivateControllerDeleteVideoPrivate } from '@/shared/api/generated/video-private/video-private'
import { getVideoPrivateControllerGetUserVideosPrivateQueryKey } from '@/shared/api/generated/video-private/video-private'
import { NotificationContext } from '@/shared/ui/Notification/fn/context'
import { pageUrls } from '@/utils/pageUrls'
import { useVideoStore } from '_pages/media/video/videoStore'

export function useGetDeleteVideo() {
	const { notify } = useContext(NotificationContext)
	const router = useRouter()
	const [status, setStatus] = useState<'idle' | 'loading'>('idle')

	const { mutateAsync: deleteVideo } = useVideoPrivateControllerDeleteVideoPrivate()
	const queryClient = useQueryClient()

	const onDeleteVideoClick = useCallback(
		async function () {
			const video = useVideoStore.getState().privateVideo.data
			if (!video) return

			setStatus('loading')

			try {
				await deleteVideo({ id: video.id })

				queryClient.invalidateQueries({ queryKey: getVideoPrivateControllerGetUserVideosPrivateQueryKey() })

				setStatus('idle')
				router.push(pageUrls.videos.path)
			} catch {
				notify({
					type: 'error',
					message:
						'Не удалось удалить видео. Попробуйте ещё раз или сообщите о проблеме в форме обратной связи.',
				})
			}
		},
		[deleteVideo, notify, router, queryClient],
	)

	return {
		status,
		onDeleteVideoClick,
	}
}
