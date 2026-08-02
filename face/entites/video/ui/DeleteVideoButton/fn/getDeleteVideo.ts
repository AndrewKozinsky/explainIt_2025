import { useCallback, useMemo, useState } from 'react'
import { VideosApi } from '@/entites/videos/repository/VideosApi'
import { VideosService } from '@/entites/videos/VideosService'

export function useGetDeleteVideo(videoId: number, onDeleted: () => void) {
	const [status, setStatus] = useState<'idle' | 'loading'>('idle')

	const videosService = useMemo(() => new VideosService(new VideosApi()), [])

	const onDeleteClick = useCallback(async () => {
		setStatus('loading')

		const result = await videosService.deleteVideo(videoId)

		if (result.error || result.errors) {
			setStatus('idle')
			return
		}

		onDeleted()
	}, [videoId, videosService, onDeleted])

	return {
		status,
		onDeleteClick,
	}
}
