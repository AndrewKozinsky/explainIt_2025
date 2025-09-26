import { usePathname } from 'next/navigation'
import { pageUrls } from 'сonsts/pageUrls'

/** Определяет какую страницу показать в зависимости от адреса страницы */
export function useGetShowingPageType(): 'books' | 'reading' {
	const pathname = usePathname()

	return pathname.endsWith('/' + pageUrls.books.book(1).chapter(1).reading.segment) ? 'reading' : 'books'
}
