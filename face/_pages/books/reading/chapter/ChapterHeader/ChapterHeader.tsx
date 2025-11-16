import React from 'react'
import { useReadingStore } from '_pages/books/reading/readingStore'
import './ChapterHeader.scss'

function ChapterHeader() {
	const chapterHeader = useReadingStore((s) => s.populatedChapter.header)
	if (!chapterHeader) return null

	return <p className='book-chapter-header'>{chapterHeader}</p>
}

export default ChapterHeader
