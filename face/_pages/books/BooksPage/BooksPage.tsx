'use client'

import React from 'react'
import ReadingRootNext from '_pages/books/readingNext/ReadingRootNext/ReadingRootNext'
import BooksRoot from '../books/BooksRoot/BooksRoot'
// import ReadingRoot from '../reading/ReadingRoot/ReadingRoot'
import { useGetShowingPageType } from './fn/showingPageType'

function BooksPage() {
	const showingPageType = useGetShowingPageType()

	const pageMapper = {
		books: <BooksRoot />,
		// reading: <ReadingRoot />,
		reading: <ReadingRootNext />,
	}

	return pageMapper[showingPageType]
}

export default BooksPage
