'use client'

import { useReadingStore } from '_pages/books/reading/readingStore'
import RightPart from '_pages/books/reading/RightPart/RightPart'
import Chapter from '../chapter/Chapter/Chapter'
import { usePopulateReadingStore } from './fn/getContentStructure'
import './ReadingRoot.scss'

function ReadingRoot() {
	usePopulateReadingStore()

	const populatedChapter = useReadingStore((s) => s.populatedChapter)
	if (!populatedChapter) {
		return null
	}

	return (
		<div className='reading-root'>
			<div className='reading-root__chapter'>
				<Chapter />
			</div>
			<div className='reading-root__analysis'>
				<RightPart />
			</div>
		</div>
	)
}

export default ReadingRoot
