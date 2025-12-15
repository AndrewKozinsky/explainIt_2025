// import cn from 'classnames'
// import { useBooksStore } from '_pages/books/books/booksStore'
// import Paragraph from '@/ui/Paragraph/Paragraph'
// import { pageUrls } from '@/сonsts/pageUrls'
// import { bookConfig } from '../../common/bookConfig'
// import ContentLinkWrapper from '../../common/ContentLinkWrapper/ContentLinkWrapper'
// import './BookButton.scss'

/*function BookButton() {
	const book = useBooksStore((s) => s.book)
	const pageType = useBooksStore((s) => s.pageType)

	if (!book) {
		return null
	}

	return (
		<ContentLinkWrapper href={pageUrls.books.book(book?.id).path} isCurrent={pageType === 'book'}>
			<div className='book-button'>
				<BookLabel />
				{book.author && (
					<Paragraph fontSize='14' extraClass='book-button__author'>
						{book.author}
					</Paragraph>
				)}
				<Paragraph fontSize='15'>{book.name ? book.name : bookConfig.emptyBookName}</Paragraph>
			</div>
		</ContentLinkWrapper>
	)
}*/

// export default BookButton

/*function BookLabel() {
	const pageType = useBooksStore((s) => s.pageType)
	const isBookPage = pageType === 'book'

	return (
		<span className={cn('book-button__label', isBookPage ? 'book-button__lighter' : 'book-button__label--darker')}>
			Книга
		</span>
	)
}*/
