import { useMemo } from 'react'
import { MediaItemsGridConfig } from '_pages/bookAndVideoCommon/MediaItemsGrid/types'
import { useBooksStore } from '_pages/books/books/booksStore'
import { createMediaIdUrl, pageUrls } from 'сonsts/pageUrls'

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

						return {
							name: book.name,
							subName: book.author,
							url: pageUrls.books.book(bookId).path,
						}
					}),
					publicItems: publicBooks.data.map((book) => {
						const bookId = createMediaIdUrl(book.id, 'public')

						return {
							name: book.name,
							subName: book.author,
							url: pageUrls.books.book(bookId).path,
							// backgroundColor: book.backgroundColor,
							backgroundColor: '#313B3C',
							languageCode: book.languageCode,
							coverUrl: book.covers[0],
						}
					}),
				},
			}
		},
		[privateBooks, publicBooks],
	)
}
