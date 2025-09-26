import cn from 'classnames'
import Paragraph from '@/ui/Paragraph/Paragraph'
import { pageUrls } from '@/сonsts/pageUrls'
import Spinner from 'ui/Spinner/Spinner'
import { bookConfig } from '../../common/bookConfig'
import ContentLinkWrapper from '../../common/ContentLinkWrapper/ContentLinkWrapper'
import { useGetIsBookPage } from './fn/isBookPage'
import { booksFetcher } from '_pages/books/commonLogic/booksFetcher'
import './BookButton.scss'

function BookButton() {
	const currentBookId = booksFetcher.useGetCurrentBookIdFromUrl()
	const isBookPage = useGetIsBookPage(currentBookId)
	const getBookRes = booksFetcher.useGetCurrentBook()

	if (getBookRes.status === 'loading') {
		return <Spinner />
	}
	if (getBookRes.status === 'noData') {
		return <Paragraph fontSize={16}>Книга не найдена</Paragraph>
	}
	if (getBookRes.status !== 'success' || !getBookRes.data) {
		return null
	}

	const book = getBookRes.data

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
