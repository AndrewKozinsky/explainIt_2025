import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { pageUrls } from '../../../../../сonsts/pageUrls'

export function useGetIsPageCurrent(bookId: number) {
	const pathname = usePathname()
	const [isPageCurrent, setIsPageCurrent] = useState(false)

	useEffect(() => {
		setIsPageCurrent(pathname === pageUrls.books.book(bookId).path)
	}, [pathname])

	return isPageCurrent
}
