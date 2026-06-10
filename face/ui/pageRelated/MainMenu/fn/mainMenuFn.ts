import { useMemo } from 'react'
import { usePathname } from '@/i18n/routing'

/**
 * Принимает ссылку на элемент меню и возвращает булево значение
 * является ли это текущей страницей или содержит дочернюю текущую страницу.
 * @param linkUrl — url ссылки верхнего меню
 */
export function useIsCurrentPage(linkUrl: string) {
	const pathname = usePathname() || ''

	return useMemo(
		function () {
			return linkUrl === pathname || pathname.startsWith(linkUrl + '/')
		},
		[pathname],
	)
}
