import { pageUrls } from 'utils/pageUrls'
import { usePathname } from '@/i18n/routing'

export function useGetShowingMediaType() {
	const pathname = usePathname()
	return pathname.startsWith(pageUrls.books.path) ? 'book' : 'video'
}
