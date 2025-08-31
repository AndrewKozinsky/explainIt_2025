import { booksFetcher } from '_pages/books/booksFetcher'
import React from 'react'
import './ChapterText.scss'

function ChapterText() {
	const chapterData = booksFetcher.useGetCurrentChapter()
	if (!chapterData) return null

	return <p className='chapter-text'>{chapterData.content}</p>
}

export default ChapterText
