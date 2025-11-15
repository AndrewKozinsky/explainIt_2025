'use client'

import React from 'react'
import ReadingRootNext from '_pages/books/readingNext/ReadingRootNext/ReadingRootNext'
import BooksRoot from '../books/BooksRoot/BooksRoot'
import { useGetShowingPageType } from './fn/showingPageType'

function BooksPage() {
	const showingPageType = useGetShowingPageType()

	const pageMapper = {
		books: <BooksRoot />,
		reading: <ReadingRootNext />,
	}

	return pageMapper[showingPageType]
}

export default BooksPage
