'use client'

import React from 'react'
import BooksRoot from '../books/BooksRoot/BooksRoot'
import ReadingRoot from '../reading/ReadingRoot/ReadingRoot'
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
