import { useEffect } from 'react'
import { booksLogic } from '../../../../booksLogic'

export function useSetFieldValues(reset: (data: any) => void) {
	const chapter = booksLogic.useGetCurrentChapter()

	useEffect(() => {
		if (!chapter) return

		reset({
			name: chapter.name ?? '',
			header: chapter.header ?? '',
			content: chapter.content ?? '',
			note: chapter.note ?? '',
		})
	}, [chapter, reset])
}
