import { useGetOnBookLinkClick } from '_pages/books/books/booksListSection/BookLink/fn/onClick'
import { BooksTest } from '_pages/books/books/booksTest'
import Paragraph from '@/ui/Paragraph/Paragraph'
import { pageUrls } from '@/сonsts/pageUrls'
import cn from 'classnames'
import ContentLinkWrapper from '../../common/ContentLinkWrapper/ContentLinkWrapper'
import { useGetBookLinkStatus } from './fn/isPageCurrent'
import { bookConfig } from '../../common/bookConfig'
import './BookLink.scss'

type BookLinkProps = {
	bookData: {
		id: number
		bookType: 'public' | 'private'
		author?: null | string
		name?: null | string
	}
}

function BookLink(props: BookLinkProps) {
	const { id, bookType, author, name } = props.bookData

	const bookLinkStatus = useGetBookLinkStatus(id, bookType)
	const onBookLinkClick = useGetOnBookLinkClick()

	return (
		<ContentLinkWrapper
			href={pageUrls.books.book(id, bookType).path}
			status={bookLinkStatus}
			dataTestId={BooksTest.booksList.bookLinkItem(id)}
			onClick={onBookLinkClick}
		>
			<div className='book-link'>
				{author && (
					<Paragraph
						fontSize='15'
						extraClass={cn('book-link__author', 'book-link__author--' + bookLinkStatus)}
					>
						{author}
					</Paragraph>
				)}
				<Paragraph fontSize='18'>{name ? name : bookConfig.emptyBookName}</Paragraph>
			</div>
		</ContentLinkWrapper>
	)
}

export default BookLink
