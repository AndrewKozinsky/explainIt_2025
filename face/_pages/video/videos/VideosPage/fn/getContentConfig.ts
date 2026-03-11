import { useMemo } from 'react'
import { MediaItemsGridConfig } from '_pages/bookAndVideoCommon/MediaItemsGrid/types'
import { useVideosStore } from '../../videosStore'
import { createBookIdUrl, pageUrls } from 'сonsts/pageUrls'

export function useGetContentConfig() {
	const privateVideos = useVideosStore((s) => s.privateVideos)
	const publicVideos = useVideosStore((s) => s.publicVideos)

	return useMemo(
		function (): {
			loading: boolean
			error: null | string
			config: null | MediaItemsGridConfig
		} {
			const errorMessage = privateVideos.errorMessage || publicVideos.errorMessage
			const isLoading = privateVideos.loading || publicVideos.loading

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
					privateItems: privateVideos.data.map((book) => {
						const bookId = createBookIdUrl(book.id, 'private')

						return {
							name: book.name,
							subName: book.year,
							url: pageUrls.books.book(bookId).path,
						}
					}),
					publicItems: publicVideos.data.map((book) => {
						const bookId = createBookIdUrl(book.id, 'public')

						return {
							name: book.name,
							subName: book.year,
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
		[privateVideos, publicVideos],
	)
}
