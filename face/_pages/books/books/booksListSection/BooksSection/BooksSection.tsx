import PrivateBooksListSection from '_pages/books/books/booksListSection/PrivateBooksSection/PrivateBooksListSection'
import PublicBooksList from '../PublicBooksList/PublicBooksList'
import './BooksSection.scss'

function BooksSection() {
	return (
		<div className='books-section'>
			<PublicBooksList />
			<PrivateBooksListSection />
		</div>
	)
}

export default BooksSection
