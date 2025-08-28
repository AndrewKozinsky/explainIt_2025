import cn from 'classnames'
import React from 'react'
import Paragraph from '../../../../ui/Paragraph/Paragraph'
import { pageUrls } from '../../../../сonsts/pageUrls'
import { booksLogic } from '../../booksLogic'
import { bookConfig } from '../../common/bookConfig'
import ContentLinkWrapper from '../../common/ContentLinkWrapper/ContentLinkWrapper'
import { useGetIsBookPage } from './fn/isBookPage'
import './BookButton.scss'

function BookButton() {
	const currentBookId = booksLogic.useGetCurrentBookId()
	const isBookPage = useGetIsBookPage(currentBookId)
	const book = booksLogic.useGetCurrentBook()

	if (!book) return null

	return (
		<ContentLinkWrapper href={pageUrls.books.book(currentBookId).path} isCurrent={isBookPage}>
			<div className='book-button'>
				<BookLabel isBookPage={isBookPage} />
				{book.author && (
					<Paragraph fontSize='14' extraClass='book-button__author'>
						{book.author}
					</Paragraph>
				)}
				<Paragraph fontSize='15'>{book.name ? book.name : bookConfig.emptyBookName}</Paragraph>
			</div>
		</ContentLinkWrapper>
	)
}

export default BookButton

type BookLabelProps = {
	isBookPage: boolean
}

function BookLabel(props: BookLabelProps) {
	const { isBookPage } = props

	return (
		<span className={cn('book-button__label', isBookPage ? 'book-button__lighter' : 'book-button__label--darker')}>
			Книга
		</span>
	)
}
