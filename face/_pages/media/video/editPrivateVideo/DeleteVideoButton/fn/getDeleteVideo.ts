import { useCallback, useContext, useState } from 'react'
import { redirect } from 'next/navigation'
import { useVideoPrivate_Delete, VideoPrivate_GetUserVideosDocument } from '@/graphql'
import { NotificationContext } from '@/ui//Notification/context'
import { pageUrls } from '@/сonsts/pageUrls'
import { useVideoStore } from '_pages/media/video/videoStore'

export function useGetDeleteVideo() {
	const { notify } = useContext(NotificationContext)
	const [status, setStatus] = useState<'idle' | 'loading'>('idle')

	const [deleteVideo] = useVideoPrivate_Delete({ refetchQueries: [VideoPrivate_GetUserVideosDocument] })

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

			redirect(pageUrls.videos.path)
		},
		[deleteVideo, notify],
	)

	return {
		status,
		onDeleteVideoClick,
	}
}
