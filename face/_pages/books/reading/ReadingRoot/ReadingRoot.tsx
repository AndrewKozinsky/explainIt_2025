import { useReadingStore } from '_pages/books/reading/readingStore'
import Analysis from '../analysis/Analysis/Analysis'
import BookAndPrevAndNextChapters from '../chapter/BookAndPrevAndNextChapters/BookAndPrevAndNextChapters'
import BookAuthorAndName from '../chapter/BookAuthorAndName/BookAuthorAndName'
import ChapterHeader from '../chapter/ChapterHeader/ChapterHeader'
import ChapterName from '../chapter/ChapterName/ChapterName'
import ChapterContent from '../chapterContent/ChapterContent/ChapterContent'
import { useAutoScrollToTop } from './fn/autoScrollToTop'
import { usePopulateReadingStore } from './fn/getContentStructure'
import './ReadingRoot.scss'

function ReadingRoot() {
	usePopulateReadingStore()
	useAutoScrollToTop()

	const bookData = useReadingStore((s) => s.book?.data)
	const populatedChapter = useReadingStore((s) => s.populatedChapter)
	if (!bookData || !populatedChapter) {
		return null
	}

	return (
		<div className='reading-root'>
			<BookAuthorAndName />
			<div className='reading-root__chapter-content'>
				<ChapterName />
				<ChapterHeader />
				<ChapterContent />
				<div className='reading-root__auto-height-elem' />
				<Analysis />
				<BookAndPrevAndNextChapters />
			</div>
		</div>
	)
}

export default ReadingRoot
