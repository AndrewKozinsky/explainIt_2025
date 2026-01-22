import { useEffect } from 'react'
import { useVideosStore } from '_pages/video/videos/videosStore'

export function useSetFieldValues(reset: (data: any) => void) {
	const book = useVideosStore((s) => s.privateVideo)

	useEffect(() => {
		if (!book) return

		reset({
			name: book.name ?? '',
			text: book.text ?? '',
		})
	}, [book, reset])
}
