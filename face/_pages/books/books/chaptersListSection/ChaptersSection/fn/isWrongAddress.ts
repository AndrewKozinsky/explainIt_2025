import { usePathname } from 'next/navigation'
import { pageUrls } from '@/сonsts/pageUrls'
import { booksLogic } from '../../../booksLogic'

export function useIsWrongUrl() {
	const pathname = usePathname()
	const currentBook = booksLogic.useGetCurrentBook()

	return !currentBook && pathname !== pageUrls.books.path
}

export function useIsBooksUrl() {
	const pathname = usePathname()

	return pathname === pageUrls.books.path
}
