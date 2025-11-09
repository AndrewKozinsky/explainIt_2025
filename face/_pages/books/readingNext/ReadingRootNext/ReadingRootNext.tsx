import BookAuthorAndName from '_pages/books/readingNext/chapter/BookAuthorAndName/BookAuthorAndName'
import { useReadingStoreNext } from '../readingStoreNext'
import { useClearSelectedSentenceAfterChapterWasChanged } from './fn/clearSelectedSenteceAfterChapterWasChanged'
import { usePopulateReadingStore } from './fn/getContentStructure'
import ChapterContent from '_pages/books/readingNext/chapterContent/ChapterContent/ChapterContent'
import BookAndPrevAndNextChapters from '../chapter/BookAndPrevAndNextChapters/BookAndPrevAndNextChapters'
import ChapterName from '../chapter/ChapterName/ChapterName'
import ChapterHeader from '../chapter/ChapterHeader/ChapterHeader'
import { useRegisterCmdSelectionListener } from './fn/wordClickHandler'
import Analysis from '../analysis/Analysis/Analysis'
import { useSetDeviceType } from './fn/setDeviceType'
import './ReadingRootNext.scss'

function ReadingRootNext() {
	usePopulateReadingStore()
	useClearSelectedSentenceAfterChapterWasChanged()
	useRegisterCmdSelectionListener()
	useSetDeviceType()

	const bookData = useReadingStoreNext((s) => s.book?.data)
	const populatedChapter = useReadingStoreNext((s) => s.populatedChapter)
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
				<Analysis />
				<BookAndPrevAndNextChapters />
			</div>
		</div>
	)
}

export default ReadingRootNext
