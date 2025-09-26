import { chapterStructureIntoText } from '_pages/books/commonLogic/chapterStructureIntoText/chapterStructureIntoText'
import { ChapterTextStructure } from '_pages/books/commonLogic/chapterStructureTypes'
import { BookChapterOutModel } from 'graphql'
import { useEffect } from 'react'

export function useSetFieldValues(reset: (data: any) => void, chapter: BookChapterOutModel) {
	useEffect(() => {
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
