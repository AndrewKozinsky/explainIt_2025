import { BooksStore, useBooksStore } from '_pages/books/books/booksStore'
import { useCallback } from 'react'

export const tabsConfig = [
	{
		id: 'books',
		label: 'Книги',
		onClick: getChangeCurrentMobileContentType('books'),
	},
	{
		id: 'book',
		label: 'Главы',
		onClick: getChangeCurrentMobileContentType('book'),
	},
	{
		id: 'chapter',
		label: 'Детали',
		onClick: getChangeCurrentMobileContentType('chapter'),
	},
]

function getChangeCurrentMobileContentType(contentType: BooksStore.MobileCurrentContentType) {
	const { updateMobileCurrentContentType } = useBooksStore.getState()

	return () => {
		updateMobileCurrentContentType(contentType)
	}
}
