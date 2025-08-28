import React from 'react'
import Paragraph from '../../../../ui/Paragraph/Paragraph'
import { booksLogic } from '../../booksLogic'
import ChapterLink from '../ChapterLink/ChapterLink'
import './ChaptersList.scss'

function ChaptersList() {
	const book = booksLogic.useGetCurrentBook()
	if (!book || !book.chapters.length) return null

	return (
		<>
			<Paragraph fontSize='14' extraClass='chapters-list__header'>
				Главы
			</Paragraph>
			{book.chapters.map((chapter) => {
				return <ChapterLink bookId={book.id} chapterData={chapter} key={chapter.id} />
			})}
		</>
	)
}

export default ChaptersList
