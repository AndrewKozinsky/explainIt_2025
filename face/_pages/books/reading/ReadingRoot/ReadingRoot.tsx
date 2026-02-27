import DetailsBlock from '_pages/bookAndVideoCommon/detailsBlock/DetailsBlock/DetailsBlock'
import RootSurface from '_pages/bookAndVideoCommon/RootSurface/RootSurface'
import BookAndPrevAndNextChapters from '../chapter/BookAndPrevAndNextChapters/BookAndPrevAndNextChapters'
import BookAuthorAndName from '../chapter/BookAuthorAndName/BookAuthorAndName'
import ChapterHeader from '../chapter/ChapterHeader/ChapterHeader'
import ChapterName from '../chapter/ChapterName/ChapterName'
import ChapterContent from '../ChapterContent/ChapterContent'
import { useAutoScrollToTop } from './fn/autoScrollToTop'
import { useClearReadingStoreOnUnmount } from './fn/clearStoreOnUnmount'
import { usePopulateReadingStore } from './fn/getContentStructure'
import { useGetFetchedDataStatuses } from './fn/getFetchedDataStatuses'
import './ReadingRoot.scss'

function ReadingRoot() {
	usePopulateReadingStore()
	useClearReadingStoreOnUnmount()
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
				<div className='reading-root__analysis'>
					<DetailsBlock />
				</div>
			</div>
		</RootSurface>
	)
}

export default ReadingRoot
