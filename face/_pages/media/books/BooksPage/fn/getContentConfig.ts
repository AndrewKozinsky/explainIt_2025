import { useMemo } from 'react'
import { LanguageCode } from 'utils/languages'
import { localStorageManager } from 'utils/localStorageManager'
import { createMediaIdUrl, pageUrls } from 'utils/pageUrls'
import { useBooksStore } from '_pages/media/books/booksStore'
import { MediaItemsGridConfig } from '_pages/media/commonComponents/mediaItemsGrid/MediaItemsGrid/types'

export function useGetContentConfig() {
	const privateBooks = useBooksStore((s) => s.privateBooks)
	const publicBooks = useBooksStore((s) => s.publicBooks)

	return useMemo(
		function (): {
			loading: boolean
			error: null | string
			config: null | MediaItemsGridConfig
			} {
			const errorMessage = privateBooks.errorMessage || publicBooks.errorMessage
			const isLoading = privateBooks.loading || publicBooks.loading

			if (errorMessage) {
				return {
					loading: false,
					error: errorMessage,
					config: null,
				}
			} else if (isLoading) {
				return {
					loading: false,
					error: null,
					config: null,
				}
			}

			return {
				loading: false,
				error: null,
				config: {
					privateItems: privateBooks.data.map((book) => {
						const bookId = createMediaIdUrl(book.id, 'private')
						const chapterId = resolveChapterId(bookId, book.chapters)

						return {
							name: book.name,
							subName: book.author,
							url: pageUrls.books.book(bookId).chapter(chapterId).reading.path,
							actionUrl: pageUrls.books.book(bookId).path,
							coverUrl: book.coverUrl ?? undefined,
						}
					}),
					publicItems: publicBooks.data.map((book) => {
						const bookId = createMediaIdUrl(book.id, 'public')
						const chapterId = resolveChapterId(bookId, book.chapters)

						return {
							name: book.name,
							subName: book.author,
							url: pageUrls.books.book(bookId).chapter(chapterId).reading.path,
							actionUrl: pageUrls.books.book(bookId).path,
							backgroundColor: book.coverBackgroundColor,
							languageCode: book.languageCode as LanguageCode,
							coverUrl: book.covers[0],
							freeToUse: book.freeToUse,
						}
					}),
				},
			}
		},
		[privateBooks, publicBooks],
	)
}

function resolveChapterId(bookUrlId: string, chapters: { id: number }[]): number {
	const savedChapterId = localStorageManager.lastBookChapter.get(bookUrlId)

	if (savedChapterId !== null && chapters.some((c) => c.id === savedChapterId)) {
		return savedChapterId
	}

	return chapters[0].id
}
