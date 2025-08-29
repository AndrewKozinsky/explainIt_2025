'use client'

import React from 'react'
import { PageWrapper } from '@/ui/pageRelated/PageWrapper/PageWrapper'
import BooksSection from '../booksListSection/BooksSection/BooksSection'
import ChaptersSection from '../chaptersListSection/ChaptersSection/ChaptersSection'
import EditableFormSection from '../editableFormSection/EditableFormSection/EditableFormSection'
import { useChangeBodyBgColor } from './fn/changeBodyBgColor'
import { useGetFetchBooksAndSetToStore } from './fn/fetchBooksAndSetToStore'
import './BooksPage.scss'

function BooksPage() {
	useChangeBodyBgColor()
	useGetFetchBooksAndSetToStore()

	return (
		<PageWrapper top>
			<main className='books-page-content'>
				<div className='books-page-content__books'>
					<BooksSection />
				</div>
				<div className='books-page-content__book'>
					<ChaptersSection />
				</div>
				<div className='books-page-content__content'>
					<EditableFormSection />
				</div>
			</main>
		</PageWrapper>
	)
}

export default BooksPage
