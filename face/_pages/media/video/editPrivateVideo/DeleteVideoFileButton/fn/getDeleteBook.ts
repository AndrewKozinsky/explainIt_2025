import { useCallback, useContext, useState } from 'react'
import { useVideoPrivate_Update, VideoPrivate_GetUserVideosDocument } from '@/graphql'
import { NotificationContext } from '@/ui//Notification/context'
import { useVideoStore } from '_pages/media/video/videoStore'

export function useGetDeleteVideoFile() {
	const { notify } = useContext(NotificationContext)
	const [status, setStatus] = useState<'idle' | 'loading'>('idle')

	const [updateVideo] = useVideoPrivate_Update({ refetchQueries: [VideoPrivate_GetUserVideosDocument] })

	const onDeleteFileClick = useCallback(
		async function () {
			const video = useVideoStore.getState().privateVideo.data
			if (!video) return

			setStatus('loading')

			const { errors } = await updateVideo({ variables: { input: { id: video.id, fileName: null } } })

			if (errors) {
				notify({
					type: 'error',
					message:
						'Не удалось удалить видео. Попробуйте ещё раз или сообщите о проблеме в форме обратной связи.',
				})
				return
			}

			setStatus('idle')
		},
		[updateVideo, notify],
	)

	return {
		status,
		onDeleteFileClick,
	}
}
