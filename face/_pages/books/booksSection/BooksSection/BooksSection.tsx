import React from 'react'
import AddBookButton from '../AddBookButton/AddBookButton'
import BooksList from '../BooksList/BooksList'
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
