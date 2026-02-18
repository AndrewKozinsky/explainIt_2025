import MobileNavigation from '_pages/bookAndVideoCommon/MobileNavigation/MobileNavigation'
import { useBooksStore } from '_pages/books/books/booksStore'
import { tabsConfig } from './fn/tabsConfig'

function BooksMobileNavigation() {
	const mobileCurrentContentType = useBooksStore((s) => s.mobileCurrentContentType)

	return <MobileNavigation currentTabId={mobileCurrentContentType} tabsConfig={tabsConfig} />
}

export default BooksMobileNavigation
