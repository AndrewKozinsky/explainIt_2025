import Link from 'next/link'
import { useParams } from 'next/navigation'
import { pageUrls } from 'сonsts/pageUrls'
import { useReadingStore } from '_pages/books/reading/readingStore'
import './BookAuthorAndName.scss'

function BookAuthorAndName() {
	const book = useReadingStore((s) => s.book.data)

	if (!book.author && !book.name) {
		return null
	}

	return (
		<div className='book-author-and-name'>
			<BookAuthorAndNameContent />
		</div>
	)
}

export default BookAuthorAndName

function BookAuthorAndNameContent() {
	const bookIdInUrl = useParams().bookId as string
	const book = useReadingStore((s) => s.book.data)

	if (book.author && !book.name) {
		return <div className='book-author-and-name__left'>{book.author}</div>
	}
	if (!book.author && book.name) {
		return <div className='book-author-and-name__left'>{book.name}</div>
	}

	return (
		<>
			<div className='book-author-and-name__left'>{book.author}</div>
			<div className='book-author-and-name__right'>
				<Link href={pageUrls.books.book(bookIdInUrl).path} className='link'>
					{book.name}
				</Link>
			</div>
		</>
	)
}
