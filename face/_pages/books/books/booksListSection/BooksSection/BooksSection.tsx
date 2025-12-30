import PrivateVideosListSection from '_pages/books/books/booksListSection/PrivateVideosSection/PrivateVideosListSection'
import PublicBooksList from '../PublicBooksList/PublicBooksList'
import './BooksSection.scss'

function BooksSection() {
	return (
		<div className='books-section'>
			<PublicBooksList />
			<PrivateVideosListSection />
		</div>
	)
}

export default BooksSection
