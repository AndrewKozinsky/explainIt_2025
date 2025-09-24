import { ChapterTextStructure, ChapterTextStructureFull } from '@/_pages/books/chapterStructureTypes'
import { booksFetcher } from '_pages/books/booksFetcher'
import { useReadingStore } from '_pages/books/reading/readingStore'
import { useEffect } from 'react'

export function useGetChapterDataAndSetToStore() {
	const bookData = booksFetcher.useGetCurrentBook()
	const chapterData = booksFetcher.useGetCurrentChapter()

	useEffect(
		function () {
			if (!chapterData || !bookData) return

			const chapterStructure = chapterData.content
				? (JSON.parse(chapterData.content) as ChapterTextStructure.Chapter)
				: null

			if (!chapterStructure) {
				return
			}

			const chapter = fullChapterStructureUsefulData(chapterStructure)

			// Put data to the ReadingStore
			useReadingStore.setState({
				chapterId: chapterData.id,
				chapter: chapter,
				bookName: bookData.name,
				bookAuthor: bookData.author,
			})
		},
		[bookData, chapterData],
	)
}

/**
 * Получает структуру главы с сервера и наполняет её полезными данными чтобы из
 * ChapterTextStructure.Chapter получить ChapterTextStructureFull.Chapter
 * @param chapterStructure — данные с сервера преобразованные в массив объектов
 */
function fullChapterStructureUsefulData(chapterStructure: ChapterTextStructure.Chapter) {
	let elementId = 1

	const fullStructure: ChapterTextStructureFull.Chapter = chapterStructure.map((item: any) => {
		const currentId = elementId++
		if (item.t === 'sentence') {
			let partId = 1
			const parts = (item.parts || []).map((part: any) => {
				const currentPartId = partId++
				if (part.t === 'word') {
					return { id: currentPartId, type: 'word', value: part.v } as const
				} else if (part.t === 'punctuation') {
					return { id: currentPartId, type: 'punctuation', value: part.v } as const
				} else if (part.t === 'space') {
					return { id: currentPartId, type: 'space' } as const
				} else if (part.t === 'carriageReturn') {
					return { id: currentPartId, type: 'carriageReturn' } as const
				}
				// Fallback in case of an unknown type
				return { id: currentPartId, type: 'space' } as const
			})

			return {
				id: currentId,
				type: 'sentence',
				translatedSentence: item.translate ?? null,
				parts,
			}
		} else if (item.t === 'space') {
			return { id: currentId, type: 'space' }
		} else if (item.t === 'carriageReturn') {
			return { id: currentId, type: 'carriageReturn' }
		} else if (item.t === 'punctuation') {
			return { id: currentId, type: 'punctuation', value: item.v }
		}

		// Fallback in case of unknown top-level type
		return { id: currentId, type: 'space' }
	})

	return fullStructure
}
