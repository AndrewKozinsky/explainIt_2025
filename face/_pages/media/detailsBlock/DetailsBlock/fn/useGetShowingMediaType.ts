import { usePathname } from '@/i18n/routing'
import { pageUrls } from '@/shared/utils/pageUrls'

export function useGetShowingMediaType() {
	const pathname = usePathname()
	return pathname.startsWith(pageUrls.books.path) ? 'book' : 'video'
}
