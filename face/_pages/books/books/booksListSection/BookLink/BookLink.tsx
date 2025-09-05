import { BooksTest } from '_pages/books/books/booksTest'
import React from 'react'
import Paragraph from '@/ui/Paragraph/Paragraph'
import { pageUrls } from '@/сonsts/pageUrls'
import ContentLinkWrapper from '../../common/ContentLinkWrapper/ContentLinkWrapper'
import { useGetIsPageCurrent } from './fn/isPageCurrent'
import { bookConfig } from '../../common/bookConfig'
import './BookLink.scss'

type BookLinkProps = {
	bookData: {
		id: number
		author?: null | string
		name?: null | string
	}
}

function BookLink(props: BookLinkProps) {
	const { id, author, name } = props.bookData

	const isPageCurrent = useGetIsPageCurrent(id)

	return (
		<ContentLinkWrapper
			href={pageUrls.books.book(id).path}
			isCurrent={isPageCurrent}
			dataTestId={BooksTest.booksList.bookLinkItem(id)}
		>
			<div className='book-link'>
				{author && (
					<Paragraph fontSize='14' extraClass='book-link__author'>
						{author}
					</Paragraph>
				)}
				<Paragraph fontSize='15'>{name ? name : bookConfig.emptyBookName}</Paragraph>
			</div>
		</ContentLinkWrapper>
	)
}

export default BookLink
