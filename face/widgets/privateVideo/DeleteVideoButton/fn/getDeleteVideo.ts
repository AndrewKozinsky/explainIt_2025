import { useCallback, useState } from 'react'
import { videosService } from '@/entities/video/VideosService'

export function useGetDeleteVideo(videoId: number, onDeleted: () => void) {
	const [status, setStatus] = useState<'idle' | 'loading'>('idle')

	const onDeleteClick = useCallback(async () => {
		setStatus('loading')

		const result = await videosService.deleteVideo(videoId)

		if (result.error || result.errors) {
			setStatus('idle')
			return
		}

		onDeleted()
	}, [videoId, onDeleted])

	return {
		status,
		onDeleteClick,
	}
}
