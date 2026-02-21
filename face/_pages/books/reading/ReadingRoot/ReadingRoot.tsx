// import SelectedSentenceBlock from '_pages/bookAndVideoCommon/selectedSentence/SelectedSentenceBlock/SelectedSentenceBlock'
import RootSurface from '_pages/bookAndVideoCommon/RootSurface/RootSurface'
import BookAndPrevAndNextChapters from '../chapter/BookAndPrevAndNextChapters/BookAndPrevAndNextChapters'
import BookAuthorAndName from '../chapter/BookAuthorAndName/BookAuthorAndName'
import ChapterHeader from '../chapter/ChapterHeader/ChapterHeader'
import ChapterName from '../chapter/ChapterName/ChapterName'
import ChapterContent from '../chapterContent/ChapterContent/ChapterContent'
import { useAutoScrollToTop } from './fn/autoScrollToTop'
import { usePopulateReadingStore } from './fn/getContentStructure'
import { useGetFetchedDataStatuses } from './fn/getFetchedDataStatuses'
import './ReadingRoot.scss'

function ReadingRoot() {
	usePopulateReadingStore()
	const { fetchedDataLoading, fetchedDataErrorMessage } = useGetFetchedDataStatuses()

	useAutoScrollToTop()

	return (
		<RootSurface loading={fetchedDataLoading} error={fetchedDataErrorMessage}>
			<div className='reading-root'>
				<div className='reading-root__content'>
					<BookAuthorAndName />
					<ChapterName />
					<ChapterHeader />
					<ChapterContent />
					<BookAndPrevAndNextChapters />
				</div>
				<div className='reading-root__analysis'>{/*<SelectedSentenceBlock />*/}</div>
			</div>
		</RootSurface>
	)
}

export default ReadingRoot
