import { useBooksStore } from '_pages/books/books/booksStore'
import ChaptersSection from '_pages/books/books/chaptersSection/ChaptersSection/ChaptersSection'
import DetailsSection from '_pages/books/books/detailsSection/DetailsSection/DetailsSection'
import BooksSection from '../booksListSection/BooksSection/BooksSection'
import MobileNavigation from '../MobileNavigation/MobileNavigation'
import { getSectionClasses } from './fn/getSectionClasses'
import { usePopulateBooksStore } from './fn/populateBooksStore'
import './BooksRoot.scss'

function BooksRoot() {
	usePopulateBooksStore()

	const currentMobileContentType = useBooksStore((s) => s.mobileCurrentContentType)

	return (
		<main className='books-page-content'>
			<MobileNavigation />
			<div className='books-page-content__blocks'>
				<div className={getSectionClasses('books', currentMobileContentType)}>
					<BooksSection />
				</div>
				<div className={getSectionClasses('book', currentMobileContentType)}>
					<ChaptersSection />
				</div>
				<div className={getSectionClasses('chapter', currentMobileContentType)}>
					<DetailsSection />
				</div>
			</div>
		</main>
	)
}

export default BooksRoot
