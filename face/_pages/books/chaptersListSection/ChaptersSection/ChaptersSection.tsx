import React from 'react'
import { booksLogic } from '../../booksLogic'
import AddChapterButton from '../AddChapterButton/AddChapterButton'
import BookButton from '../BookButton/BookButton'
import ChaptersList from '../ChaptersList/ChaptersList'
import './ChaptersSection.scss'

function ChaptersSection() {
	const currentBookId = booksLogic.useGetCurrentBookId()
	if (!currentBookId) return null

	return (
		<div className='books-section'>
			<BookButton />
			<ChaptersList />
			<AddChapterButton />
		</div>
	)
}

export default ChaptersSection
