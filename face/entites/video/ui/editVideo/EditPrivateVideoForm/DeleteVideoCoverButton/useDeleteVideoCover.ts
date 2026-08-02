import { useContext, useCallback, useMemo, useState } from 'react'
import type { VideoLiteModel } from '@/entites/videos/repository/VideosRepository'
import { VideosService } from '@/entites/videos/VideosService'
import { VideosApi } from '@/entites/videos/repository/VideosApi'
import { NotificationContext } from '@/shared/ui/Notification/fn/context'

export function useDeleteVideoCover(
	videoId: number,
	onDeleted: (video: VideoLiteModel) => void,
) {
	const { notify } = useContext(NotificationContext)
	const [status, setStatus] = useState<'idle' | 'loading'>('idle')

	const videosService = useMemo(() => new VideosService(new VideosApi()), [])

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
	}, [videoId, videosService, onDeleted, notify])

	return {
		status,
		onDeleteClick,
	}
}
