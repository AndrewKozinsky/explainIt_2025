import { usePathname } from 'next/navigation'
import { pageUrls } from '@/сonsts/pageUrls'
import { booksFetcher } from '@/_pages/books/booksFetcher'

export function useIsWrongUrl() {
	const pathname = usePathname()
	const currentBook = booksFetcher.useGetCurrentBook()

	return !currentBook && pathname !== pageUrls.books.path
}

export function useIsBooksUrl() {
	const pathname = usePathname()

	return pathname === pageUrls.books.path
}
