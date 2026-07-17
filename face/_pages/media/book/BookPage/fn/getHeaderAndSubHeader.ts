import { useMemo } from 'react'
import { useBookStore } from '_pages/media/book/bookStore'
import { bookConfig } from '_pages/media/commonComponents/bookConfig'

export function useGetHeaderAndSubHeader() {
	const book = useBookStore((s) => s.book)

	return useMemo(
		function () {
			if (book.data) {
				return {
					header: book.data.name || bookConfig.emptyBookName,
					subHeader: book.data.author,
				}
			}

			return {
				header: '',
				subHeader: null,
			}
		},
		[book],
	)
}
