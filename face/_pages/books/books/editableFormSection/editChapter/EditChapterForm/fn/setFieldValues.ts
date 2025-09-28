import { chapterStructureIntoText } from '_pages/books/commonLogic/chapterStructureIntoText/chapterStructureIntoText'
import { useBooksStore } from '_pages/books/books/booksStore'
import { ChapterTextStructure } from '_pages/books/commonLogic/chapterStructureTypes'
import { useEffect } from 'react'

export function useSetFieldValues(reset: (data: any) => void) {
	const chapter = useBooksStore((s) => s.chapter.data)

	useEffect(() => {
		if (!chapter) return

		reset({
			name: chapter.name ?? '',
			header: chapter.header ?? '',
			content: getCorrectContent(chapter.content),
			note: chapter.note ?? '',
		})
	}, [chapter, reset])
}

function getCorrectContent(content: string | null | undefined) {
	if (!content) {
		return ''
	}

	try {
		const parsedContent: ChapterTextStructure.Chapter = JSON.parse(content)
		return chapterStructureIntoText(parsedContent)
	} catch (e) {
		return ''
	}
}
