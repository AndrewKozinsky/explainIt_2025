import { useReadingStoreNext } from '../readingStoreNext'
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
import './ReadingRootNext.scss'

function ReadingRootNext() {
	usePopulateReadingStore()
	useClearSelectedSentenceAfterChapterWasChanged()
	useRegisterCmdKeyListener()
	useRegisterEnterKeyListener()
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
				<div className='reading-root__bottom'>
					<Analysis />
					<BookAndPrevAndNextChapters />
				</div>
			</div>
		</div>
	)
}

export default ReadingRootNext
