// import { useContext, useCallback, useState } from 'react'
// import { videosService } from '@/entities/video/VideosService'
// import { NotificationContext } from '@/shared/ui/Notification/fn/context'

/*export function useDeleteVideoFile(videoId: number, onDeleted: () => void) {
	const { notify } = useContext(NotificationContext)
	const [status, setStatus] = useState<'idle' | 'loading'>('idle')

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
	}, [videoId, onDeleted, notify])

	return {
		status,
		onDeleteClick,
	}
}*/
