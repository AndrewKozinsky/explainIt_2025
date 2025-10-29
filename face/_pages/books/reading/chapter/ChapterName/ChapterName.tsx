import React from 'react'
import { useReadingStore } from '_pages/books/reading/readingStore'
import '_pages/books/reading/chapter/ChapterName/ChapterName.scss'

function ChapterName() {
	const chapter = useReadingStore((s) => s.populatedChapter)

	if (!chapter.name) {
		return null
	}

	return <p className='book-chapter-name'>{chapter.name}</p>
}

export default ChapterName
