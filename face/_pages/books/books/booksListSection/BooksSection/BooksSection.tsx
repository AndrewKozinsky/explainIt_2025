import React from 'react'
import BooksList from '../BooksList/BooksList'
import AddBookButton from '../AddBookButton/AddBookButton'
import './BooksSection.scss'

function BooksSection() {
	return (
		<div className='books-section'>
			<BooksList />
			<AddBookButton />
		</div>
	)
}

export default BooksSection
