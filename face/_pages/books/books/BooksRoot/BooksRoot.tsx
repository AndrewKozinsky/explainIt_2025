import { getSectionClasses } from '_pages/books/books/BooksRoot/fn/getSectionClasses'
import { BooksStore, useBooksStore } from '_pages/books/books/booksStore'
import MobileNavigation from '_pages/books/books/MobileNavigation/MobileNavigation'
import cn from 'classnames'
import { usePopulateBooksStore } from './fn/populateBooksStore'
import { BooksTest } from '_pages/books/books/booksTest'
import BooksSection from '../booksListSection/BooksSection/BooksSection'
import ChaptersSection from '_pages/books/books/chaptersSection/ChaptersSection/ChaptersSection'
// import EditableFormSection from '../editableFormSection/EditableFormSection/EditableFormSection'
// import { useChangeBodyBgColor } from './fn/changeBodyBgColor'
import './BooksRoot.scss'

function BooksRoot() {
	usePopulateBooksStore()

	const currentMobileContentType = useBooksStore((s) => s.mobileCurrentContentType)

	return (
		<main className='books-page-content'>
			<MobileNavigation />
			<div className='books-page-content__blocks'>
				<div
					className={getSectionClasses('books', currentMobileContentType)}
					data-testid={BooksTest.booksRoot.booksSection}
				>
					<BooksSection />
				</div>
				<div
					className={getSectionClasses('book', currentMobileContentType)}
					data-testid={BooksTest.booksRoot.bookSection}
				>
					<ChaptersSection />
				</div>
				<div
					className={getSectionClasses('chapter', currentMobileContentType)}
					data-testid={BooksTest.booksRoot.editSection}
				>
					{/*<EditableFormSection />*/}
				</div>
			</div>
		</main>
	)
}

export default BooksRoot
