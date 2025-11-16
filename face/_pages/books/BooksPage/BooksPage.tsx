'use client'

import React from 'react'
import ReadingRoot from '_pages/books/reading/ReadingRoot/ReadingRoot'
import BooksRoot from '../books/BooksRoot/BooksRoot'
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
