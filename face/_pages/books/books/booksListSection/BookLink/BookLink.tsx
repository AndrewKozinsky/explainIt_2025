import cn from 'classnames'
import Paragraph from '@/ui/Paragraph/Paragraph'
import { createBookIdUrl, pageUrls } from '@/сonsts/pageUrls'
import { bookConfig } from '../../common/bookConfig'
import ContentLinkWrapper from '../../common/ContentLinkWrapper/ContentLinkWrapper'
import { useGetBookLinkStatus } from './fn/isPageCurrent'
import { useGetOnBookLinkClick } from './fn/onClick'
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
	const bookIdInUrl = createBookIdUrl(id, bookType)

	return (
		<ContentLinkWrapper
			href={pageUrls.books.book(bookIdInUrl).path}
			status={bookLinkStatus}
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
