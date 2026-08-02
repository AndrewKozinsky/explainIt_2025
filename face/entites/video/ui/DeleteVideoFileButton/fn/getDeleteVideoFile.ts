import { useContext, useCallback, useMemo, useState } from 'react'
import { VideosApi } from '@/entites/videos/repository/VideosApi'
import { VideosService } from '@/entites/videos/VideosService'
import { NotificationContext } from '@/shared/ui/Notification/fn/context'

export function useDeleteVideoFile(videoId: number, onDeleted: () => void) {
	const { notify } = useContext(NotificationContext)
	const [status, setStatus] = useState<'idle' | 'loading'>('idle')

	const videosService = useMemo(() => new VideosService(new VideosApi()), [])

	const onDeleteClick = useCallback(async () => {
		setStatus('loading')

		const result = await videosService.updateVideo(videoId, {
			fileName: null,
		})

		if (result.error || result.errors) {
			notify({
				type: 'error',
				message:
					'Не удалось удалить файл видео. Попробуйте ещё раз или сообщите о проблеме в форме обратной связи.',
			})
			setStatus('idle')
			return
		}

		onDeleted()
		setStatus('idle')
	}, [videoId, videosService, onDeleted, notify])

	return {
		status,
		onDeleteClick,
	}
}
