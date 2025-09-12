import { ChapterTextStructure } from '_pages/books/books/editableFormSection/common/chapterStructureTypes'
import { useMemo } from 'react'
import { BookChapterOutModel, useBook_GetUserBooks, useBookChapter_Get } from '@/graphql'
import { useParams } from 'next/navigation'

export const booksFetcher = {
	useGetBooks() {
		const { data, error, loading } = useBook_GetUserBooks()

		return useMemo(
			function () {
				if (loading) return null

				if (error || !data) {
					return null
				}

				return data.book_user_books
			},
			[data, error, loading],
		)
	},
	useGetCurrentBookIdFromUrl() {
		return useParams().bookId as string
	},
	useGetCurrentChapterIdFromUrl() {
		return useParams().chapterId as string
	},
	useGetCurrentBook() {
		const books = this.useGetBooks()
		const currentBookId = this.useGetCurrentBookIdFromUrl()

		if (!books || !currentBookId) {
			return null
		}

		return books.find((book) => book.id.toString() === currentBookId)
	},
	useGetCurrentLiteChapter() {
		const book = this.useGetCurrentBook()
		const currentChapterId = this.useGetCurrentChapterIdFromUrl()

		if (!book || !currentChapterId) {
			return null
		}

		return book.chapters.find((chapter) => chapter.id.toString() === currentChapterId)
	},
	useGetCurrentChapter(): null | BookChapterOutModel {
		const chapterId = this.useGetCurrentChapterIdFromUrl()

		const { data, error, loading } = useBookChapter_Get({
			variables: { input: { id: parseInt(chapterId) } },
			skip: !chapterId,
		})

		return useMemo(
			function () {
				if (loading) return null

				if (error || !data) {
					return null
				}
				// console.log(JSON.parse(data.book_chapter_get.content))

				return data.book_chapter_get
			},
			[data, error, loading],
		)
	},
	jsonChapterContentStructureToText(chapter: undefined | null | string): string {
		if (!chapter) return ''

		let arr: any
		try {
			arr = JSON.parse(chapter)
		} catch (_e) {
			return ''
		}
		if (!Array.isArray(arr)) return ''

		const getType = (o: any): string | null => (o && (o.t ?? o.type)) ?? null
		const getValue = (o: any): string => (o && (o.v ?? o.value)) ?? ''
		const getParts = (o: any): any[] | null => {
			if (!o) return null
			if (Array.isArray(o.parts)) return o.parts
			if (Array.isArray(o.sentenceParts)) return o.sentenceParts
			return null
		}

		let text = ''
		for (const element of arr) {
			const t = getType(element)
			if (t === 'sentence') {
				const parts = getParts(element) ?? []
				for (const part of parts) {
					const pt = getType(part)
					switch (pt) {
						case 'word':
						case 'punctuation':
							text += getValue(part)
							break
						case 'space':
							text += ' '
							break
						case 'carriageReturn':
							text += '\n'
							break
					}
				}
			} else if (t === 'space') {
				text += ' '
			} else if (t === 'carriageReturn') {
				text += '\n'
			} else if (t === 'punctuation') {
				// In case top-level punctuation appears in structure
				text += getValue(element)
			}
		}

		return text
	},
}
