import { BooksStore } from '_pages/books/books/booksStore'
import { useGetChangeCurrentMobileContentType, useIsActiveButton } from './fn/onButtonClick'
import cn from 'classnames'
import React from 'react'
import './BooksMobileNavigation.scss'

function MobileNavigation() {
	return (
		<p className='books-mobile-navigation'>
			<LinkButton contentType='books'>Книги</LinkButton>
			<LinkButton contentType='book'>Главы</LinkButton>
			<LinkButton contentType='chapter'>Детали</LinkButton>
		</p>
	)
}

export default MobileNavigation

type LinkButtonProps = {
	children: React.ReactNode
	contentType: BooksStore.MobileCurrentContentType
}

function LinkButton(props: LinkButtonProps) {
	const { children, contentType } = props

	const onClick = useGetChangeCurrentMobileContentType(contentType)
	const isActive = useIsActiveButton(contentType)

	const classes = cn(
		'books-mobile-navigation__button',
		isActive ? 'books-mobile-navigation__button--active' : 'books-mobile-navigation__button--link',
	)

	return (
		<button className={classes} onClick={onClick}>
			{children}
		</button>
	)
}
