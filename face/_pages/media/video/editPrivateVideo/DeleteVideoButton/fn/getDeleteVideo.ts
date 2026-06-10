import { useCallback, useContext, useState } from 'react'
import { useVideoPrivate_Delete, VideoPrivate_GetUserVideosDocument } from '@/graphql'
import { serverRedirect } from '@/i18n/serverRedirect'
import { NotificationContext } from '@/ui//Notification/context'
import { pageUrls } from '@/utils/pageUrls'
import { useVideoStore } from '_pages/media/video/videoStore'

export function useGetDeleteVideo() {
	const { notify } = useContext(NotificationContext)
	const [status, setStatus] = useState<'idle' | 'loading'>('idle')

	const [deleteVideo] = useVideoPrivate_Delete({
		refetchQueries: [VideoPrivate_GetUserVideosDocument],
		awaitRefetchQueries: true,
	})

	const onDeleteVideoClick = useCallback(
		async function () {
			const video = useVideoStore.getState().privateVideo.data
			if (!video) return

			setStatus('loading')

			const { errors } = await deleteVideo({ variables: { input: { id: video.id } } })

			if (errors) {
				notify({
					type: 'error',
					message:
						'Не удалось удалить видео. Попробуйте ещё раз или сообщите о проблеме в форме обратной связи.',
				})
				return
			}

			setStatus('idle')

			await serverRedirect(pageUrls.videos.path)
		},
		[deleteVideo, notify],
	)

	return {
		status,
		onDeleteVideoClick,
	}
}
