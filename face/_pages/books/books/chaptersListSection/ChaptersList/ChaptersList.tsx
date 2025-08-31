import React from 'react'
import Paragraph from '@/ui/Paragraph/Paragraph'
import { booksFetcher } from '@/_pages/books/booksFetcher'
import ChapterLink from '../ChapterLink/ChapterLink'
import './ChaptersList.scss'

function ChaptersList() {
	const book = booksFetcher.useGetCurrentBook()
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
