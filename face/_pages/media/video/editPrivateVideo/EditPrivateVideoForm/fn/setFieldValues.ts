import { useEffect } from 'react'
import { useVideoStore } from '_pages/media/video/videoStore'

export function useSetFieldValues(reset: (data: any) => void) {
	const video = useVideoStore((s) => s.privateVideo.data)

	useEffect(() => {
		if (!video) return

		reset({
			name: video.name ?? '',
			content: video.originalContent ?? '',
		})
	}, [video, reset])
}
