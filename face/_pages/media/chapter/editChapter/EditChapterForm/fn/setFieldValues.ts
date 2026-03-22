import { useEffect } from 'react'
import { useChapterStore } from '_pages/media/chapter/chapterStore'

export function useSetFieldValues(reset: (data: any) => void) {
	const chapter = useChapterStore((s) => s.chapter.data)

	useEffect(() => {
		if (!chapter) return

		reset({
			name: chapter.name ?? '',
			header: chapter.header ?? '',
			content: chapter.content,
			note: chapter.note ?? '',
		})
	}, [chapter, reset])
}
