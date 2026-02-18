import PublicBooksListSection from '_pages/books/books/booksListSection/PublicBooksListSection/PublicBooksListSection'
import PrivateBooksListSection from '../PrivateBooksSection/PrivateBooksListSection'
import './BooksSection.scss'

function BooksSection() {
	return (
		<div className='books-section'>
			<PublicBooksListSection />
			<PrivateBooksListSection />
		</div>
	)
}

export default BooksSection
