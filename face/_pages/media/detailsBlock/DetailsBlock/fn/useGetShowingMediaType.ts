import { usePathname } from 'next/navigation'
import { pageUrls } from 'сonsts/pageUrls'

export function useGetShowingMediaType() {
	const pathname = usePathname()
	return pathname.startsWith(pageUrls.books.path) ? 'book' : 'video'
}
