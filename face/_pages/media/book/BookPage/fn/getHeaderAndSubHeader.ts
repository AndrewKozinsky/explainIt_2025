import { useMemo } from 'react'
import { useBookStore } from '_pages/media/book/bookStore'
import { bookConfig } from '_pages/media/commonComponents/bookConfig'

export function useGetHeaderAndSubHeader() {
	const publicBook = useBookStore((s) => s.publicBook)
	const privateBook = useBookStore((s) => s.privateBook)

	return useMemo(
		function () {
			if (publicBook.data) {
				return {
					header: publicBook.data.name || bookConfig.emptyBookName,
					subHeader: publicBook.data.author as unknown as string | null,
				}
			}

			if (privateBook.data) {
				return {
					header: (privateBook.data.name as unknown as string) || bookConfig.emptyBookName,
					subHeader: privateBook.data.author as unknown as string | null,
				}
			}

			return {
				header: '',
				subHeader: null,
			}
		},
		[publicBook, privateBook],
	)
}
