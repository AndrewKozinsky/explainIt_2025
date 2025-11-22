import { useAutoScrollToTop } from '_pages/books/reading/ReadingRoot/fn/autoScrollToTop'
import { useReadingStore } from '_pages/books/reading/readingStore'
import { useClearSelectedSentenceAfterChapterWasChanged } from './fn/clearSelectedSenteceAfterChapterWasChanged'
import { usePopulateReadingStore } from './fn/getContentStructure'
import BookAndPrevAndNextChapters from '../chapter/BookAndPrevAndNextChapters/BookAndPrevAndNextChapters'
import ChapterName from '../chapter/ChapterName/ChapterName'
import ChapterHeader from '../chapter/ChapterHeader/ChapterHeader'
import { useRegisterCmdKeyListener } from './fn/registerCmdKeyListener'
import Analysis from '../analysis/Analysis/Analysis'
import { useSetDeviceType } from './fn/setDeviceType'
import BookAuthorAndName from '../chapter/BookAuthorAndName/BookAuthorAndName'
import ChapterContent from '../chapterContent/ChapterContent/ChapterContent'
import { useRegisterEnterKeyListener } from './fn/registerEnterKeyListener'
import '_pages/books/reading/ReadingRoot/ReadingRoot.scss'
import TranslateSentences from '_pages/books/reading/TranslateSentences/TranslateSentences'

function ReadingRoot() {
	usePopulateReadingStore()
	useClearSelectedSentenceAfterChapterWasChanged()
	useRegisterCmdKeyListener()
	useRegisterEnterKeyListener()
	useSetDeviceType()
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
				<TranslateSentences />
				<ChapterContent />
				<div className='reading-root__auto-height-elem' />
				<Analysis />
				<BookAndPrevAndNextChapters />
			</div>
		</div>
	)
}

export default ReadingRoot
