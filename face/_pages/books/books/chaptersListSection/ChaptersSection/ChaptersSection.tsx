import React from 'react'
import Paragraph from '@/ui/Paragraph/Paragraph'
import AddChapterButton from '../AddChapterButton/AddChapterButton'
import BookButton from '../BookButton/BookButton'
import ChaptersList from '../ChaptersList/ChaptersList'
import { useIsBooksUrl, useIsWrongUrl } from './fn/isWrongAddress'
import './ChaptersSection.scss'

function ChaptersSection() {
	const isWrongUrl = useIsWrongUrl()
	const isBooksUrl = useIsBooksUrl()

	if (isWrongUrl) {
		return <Paragraph fontSize='15'>Запрошенной книги не существует.</Paragraph>
	}

	if (isBooksUrl) {
		return null
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
