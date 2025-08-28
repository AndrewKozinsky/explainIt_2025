import { usePathname } from 'next/navigation'

export const routesUtils = {
	useIsCurrentPage(menuItemHref: string) {
		return usePathname() === menuItemHref
	},
	useIsCurrentPageOrParentForCurrentPage(menuItemHref: string) {
		const pathname = usePathname()

		const isPageCurrent = pathname === menuItemHref
		const pageIsParentForOpenedPage = pathname.startsWith(menuItemHref + '/')

		return isPageCurrent || pageIsParentForOpenedPage
	},
}
