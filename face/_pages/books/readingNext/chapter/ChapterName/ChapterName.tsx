import React from 'react'
import { useReadingStoreNext } from '../../readingStoreNext'
import './ChapterName.scss'

function ChapterName() {
	const chapter = useReadingStoreNext((s) => s.populatedChapter)

	if (!chapter.name) {
		return null
	}

	return <p className='book-chapter-name'>{chapter.name}</p>
}

export default ChapterName
