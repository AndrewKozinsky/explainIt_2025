import React from 'react'
import { useReadingStoreNext } from '../../readingStoreNext'
import './ChapterHeader.scss'

function ChapterHeader() {
	const chapterHeader = useReadingStoreNext((s) => s.populatedChapter.header)
	if (!chapterHeader) return null

	return <p className='book-chapter-header'>{chapterHeader}</p>
}

export default ChapterHeader
