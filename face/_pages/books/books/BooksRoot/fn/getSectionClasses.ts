import cn from 'classnames'
import { BooksStore } from '_pages/books/books/booksStore'

export function getSectionClasses(
	mobileContentType: BooksStore.MobileCurrentContentType,
	currentMobileContentType: BooksStore.MobileCurrentContentType,
) {
	const classes = ['books-root__content-item', `books-root__content-item--${mobileContentType}`]

	const isThisBlockVisible = currentMobileContentType === mobileContentType

	if (isThisBlockVisible) {
		classes.push('books-root__content-item--always-visible')
	}

	return cn(classes)
}
