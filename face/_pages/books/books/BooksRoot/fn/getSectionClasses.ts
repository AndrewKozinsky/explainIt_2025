import cn from 'classnames'
import { BooksStore } from '_pages/books/books/booksStore'

export function getSectionClasses(
	mobileContentType: BooksStore.MobileCurrentContentType,
	currentMobileContentType: BooksStore.MobileCurrentContentType,
) {
	const classes = ['books-page-content__item', `books-page-content__item--${mobileContentType}`]

	const isThisBlockVisible = currentMobileContentType === mobileContentType

	if (isThisBlockVisible) {
		classes.push('books-page-content__item--always-visible')
	}

	return cn(classes)
}
