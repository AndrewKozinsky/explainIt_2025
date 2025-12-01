import { useBooksStore } from '_pages/books/books/booksStore'
import { useCallback } from 'react'

export function useGetOnBookLinkClick() {
	return useCallback(function () {
		useBooksStore.setState({
			mobileCurrentContentType: 'book',
		})
	}, [])
}
