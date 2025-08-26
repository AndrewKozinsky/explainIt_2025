'use client'

import React from 'react'
import { PageWrapper } from '@/ui/pageRelated/PageWrapper/PageWrapper'
import BooksSection from '../booksSection/BooksSection/BooksSection'
import { useChangeBodyBgColor } from './fn/changeBodyBgColor'
import './BooksPage.scss'

function BooksPage() {
	useChangeBodyBgColor()

	return (
		<PageWrapper top>
			<main className='books-page-content'>
				<div className='books-page-content__books'>
					<BooksSection />
				</div>
				<div className='books-page-content__book'>2</div>
				<div className='books-page-content__content'>3</div>
			</main>
		</PageWrapper>
	)
}

export default BooksPage
