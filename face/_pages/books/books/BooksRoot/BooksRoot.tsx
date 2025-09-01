'use client'

import { BooksTest } from '_pages/books/books/booksTest'
import React from 'react'
import BooksSection from '../booksListSection/BooksSection/BooksSection'
import ChaptersSection from '../chaptersListSection/ChaptersSection/ChaptersSection'
import EditableFormSection from '../editableFormSection/EditableFormSection/EditableFormSection'
import { useChangeBodyBgColor } from './fn/changeBodyBgColor'
import './BooksRoot.scss'

function BooksRoot() {
	useChangeBodyBgColor()

	return (
		<main className='books-page-content'>
			<div className='books-page-content__books' data-testid={BooksTest.booksRoot.booksSection}>
				<BooksSection />
			</div>
			<div className='books-page-content__book' data-testid={BooksTest.booksRoot.bookSection}>
				<ChaptersSection />
			</div>
			<div className='books-page-content__content' data-testid={BooksTest.booksRoot.editSection}>
				<EditableFormSection />
			</div>
		</main>
	)
}

export default BooksRoot
