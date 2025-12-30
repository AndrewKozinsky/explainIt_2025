// import { getSectionClasses } from '_pages/books/books/BooksRoot/fn/getSectionClasses'
// import MobileNavigation from '_pages/books/books/MobileNavigation/MobileNavigation'
import { usePopulateVideosStore } from '_pages/video/videos/VideosRoot/fn/populateVideosStore'
// import { BooksTest } from '_pages/books/books/booksTest'
// import BooksSection from '_pages/video/videos/videosListSection/BooksSection/BooksSection'
// import ChaptersSection from '_pages/books/books/chaptersSection/ChaptersSection/ChaptersSection'
// import DetailsSection from '_pages/books/books/detailsSection/DetailsSection/DetailsSection'
import './VideosRoot.scss'

function VideosRoot() {
	usePopulateVideosStore()

	// const currentMobileContentType = useVideosStore((s) => s.mobileCurrentContentType)

	return (
		<main className='videos-page-content'>
			{/*<MobileNavigation />*/}
			{/*<div className='books-page-content__blocks'>
				<div
					className={getSectionClasses('books', currentMobileContentType)}
					data-testid={BooksTest.booksRoot.booksSection}
				>
					<BooksSection />
				</div>
				<div
					className={getSectionClasses('chapter', currentMobileContentType)}
					data-testid={BooksTest.booksRoot.editSection}
				>
					<DetailsSection />
				</div>
			</div>*/}
		</main>
	)
}

export default VideosRoot
