import { useCallback, useContext, useState } from 'react'
import type { VideoLiteModel } from '@/entities/video/repository/VideosRepository'
import { videosService } from '@/entities/video/VideosService'
import { NotificationContext } from '@/shared/ui/Notification/fn/context'

export function useDeleteVideoCover(videoId: number, onDeleted: (video: VideoLiteModel) => void) {
	const { notify } = useContext(NotificationContext)
	const [status, setStatus] = useState<'idle' | 'loading'>('idle')

	const onDeleteClick = useCallback(async () => {
		setStatus('loading')

		const result = await videosService.updateVideo(videoId, {
			coverFileName: null,
		})

		if (result.error || result.errors) {
			notify({
				type: 'error',
				message:
					'Не удалось удалить обложку. Попробуйте ещё раз или сообщите о проблеме в форме обратной связи.',
			})
			setStatus('idle')
			return
		}

		if (result.data) {
			onDeleted(result.data)
		}

		setStatus('idle')
	}, [videoId, onDeleted, notify])

	return {
		status,
		onDeleteClick,
	}
}
