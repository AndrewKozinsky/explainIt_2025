'use client'

// import ReadingRoot from '_pages/books/reading/ReadingRoot/ReadingRoot'
// import BooksRoot from '_pages/video/videos/BooksRoot/BooksRoot'
// import { useGetShowingPageType } from './fn/showingPageType'

import VideosRoot from '_pages/video/videos/VideosRoot/VideosRoot'

function VideosPage() {
	// const showingPageType = useGetShowingPageType()

	/*const pageMapper = {
		books: <BooksRoot />,
		reading: <ReadingRoot />,
	}*/

	// return pageMapper[showingPageType]
	return <VideosRoot />
}

export default VideosPage
