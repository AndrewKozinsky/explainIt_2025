import { useReadingStore } from '_pages/books/reading/readingStore'
import SelectedSentenceBlock from '_pages/readingAndWatchingCommon/selectedSentence/SelectedSentenceBlock/SelectedSentenceBlock'
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
			<div className='reading-root__content'>
				<BookAuthorAndName />
				<div className='reading-root__content-inner'>
					<ChapterName />
					<ChapterHeader />
					<ChapterContent />
					<BookAndPrevAndNextChapters />
				</div>
			</div>
			<div className='reading-root__analysis'>
				<SelectedSentenceBlock />
			</div>
		</div>
	)
}

export default ReadingRoot
