import React from 'react'
import Paragraph from '../../../../ui/Paragraph/Paragraph'
import { pageUrls } from '../../../../сonsts/pageUrls'
import ContentLinkWrapper from '../../common/ContentLinkWrapper/ContentLinkWrapper'
import { useGetIsPageCurrent } from './fn/isPageCurrent'
import './BookLink.scss'

type BookLinkProps = {
	bookData: {
		id: number
		author: null | string
		name: null | string
	}
}

function BookLink(props: BookLinkProps) {
	const { id, author, name } = props.bookData

	const isPageCurrent = useGetIsPageCurrent(id)

	return (
		<ContentLinkWrapper href={pageUrls.books.book(id).path} isCurrent={isPageCurrent}>
			<div className='book-link'>
				{author && (
					<Paragraph fontSize='14' extraClass='book-link__author'>
						{author}
					</Paragraph>
				)}
				<Paragraph fontSize='15'>{name ? name : 'Новая книга...'}</Paragraph>
			</div>
		</ContentLinkWrapper>
	)
}

export default BookLink
