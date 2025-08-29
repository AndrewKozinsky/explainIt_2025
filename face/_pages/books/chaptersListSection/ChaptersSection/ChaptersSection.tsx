import React from 'react'
import Paragraph from '../../../../ui/Paragraph/Paragraph'
import AddChapterButton from '../AddChapterButton/AddChapterButton'
import BookButton from '../BookButton/BookButton'
import ChaptersList from '../ChaptersList/ChaptersList'
import { useIsWrongAddress } from './fn/isWrongAddress'
import './ChaptersSection.scss'

function ChaptersSection() {
	if (useIsWrongAddress()) {
		return <Paragraph fontSize='15'>Запрошенной книги не существует.</Paragraph>
	}

	return (
		<div className='books-section'>
			<BookButton />
			<ChaptersList />
			<AddChapterButton />
		</div>
	)
}

export default ChaptersSection
