'use client'

import BooksRoot from '../books/root/BooksRoot/BooksRoot'
import ReadingRoot from '../reading/root/ReadingRoot/ReadingRoot'
import { useGetShowingPageType } from './fn/showingPageType'

function BooksPage() {
	const showingPageType = useGetShowingPageType()

	const pageMapper = {
		books: <BooksRoot />,
		reading: <ReadingRoot />,
	}

	return pageMapper[showingPageType]
}

export default BooksPage
