import { usePathname } from 'next/navigation'
import { pageUrls } from '../../../../../сonsts/pageUrls'
import { booksLogic } from '../../../booksLogic'

export function useIsWrongAddress() {
	const pathname = usePathname()
	const currentBook = booksLogic.useGetCurrentBook()

	return !currentBook && pathname !== pageUrls.books.path
}
