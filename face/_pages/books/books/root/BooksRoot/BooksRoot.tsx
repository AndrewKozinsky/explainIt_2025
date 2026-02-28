import React from 'react'
import BooksMobileNavigation from '_pages/books/books/BooksMobileNavigation/BooksMobileNavigation'
import { useBooksStore } from '_pages/books/books/booksStore'
import DetailsSection from '_pages/books/books/detailsSection/DetailsSection/DetailsSection'
import BooksSection from '../../booksListSection/BooksSection/BooksSection'
import BooksBreadCrumbs from '../BooksBreadCrumbs/BooksBreadCrumbs'
import BooksHeader from '../BooksHeader/BooksHeader'
import { getSectionClasses } from './fn/getSectionClasses'
import { usePopulateBooksStore } from './fn/populateBooksStore'
import './BooksRoot.scss'

function BooksRoot() {
	usePopulateBooksStore()

	const currentMobileContentType = useBooksStore((s) => s.mobileCurrentContentType)

	return (
		<article className='books-root'>
			<div className='books-root__top'>
				<BooksBreadCrumbs />
				<BooksHeader />
			</div>
			<div className='books-root__content'>
				<BooksMobileNavigation />
				<div className='books-root__content-blocks'>
					<div className={getSectionClasses('books', currentMobileContentType)}>
						<BooksSection />
					</div>
					<div className={getSectionClasses('chapter', currentMobileContentType)}>
						<DetailsSection />
					</div>
				</div>
			</div>
		</article>
	)
}

export default BooksRoot
