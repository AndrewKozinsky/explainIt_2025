'use client'

// import DetailsBlock from '_pages/bookAndVideoCommon/detailsBlock/DetailsBlock/DetailsBlock'
// import BookAndPrevAndNextChapters from '../../chapter/BookAndPrevAndNextChapters/BookAndPrevAndNextChapters'
// import ChapterContent from '../../ChapterContent/ChapterContent'
import RootSurface from '_pages/media/commonComponents/RootSurface/RootSurface'
import ReadingHeader from '_pages/media/reading/root/ReadingHeader/ReadingHeader'
import { usePopulateReadingStore } from '_pages/media/reading/root/ReadingRoot/fn/populateStore'
import ReadingBreadCrumbs from '../ReadingBreadCrumbs/ReadingBreadCrumbs'
import { useAutoScrollToTop } from './fn/autoScrollToTop'
import { useClearReadingStoreOnUnmount } from './fn/clearStoreOnUnmount'
import { useGetFetchedDataStatuses } from './fn/getFetchedDataStatuses'
import './ReadingRoot.scss'

function ReadingRoot() {
	usePopulateReadingStore()
	useClearReadingStoreOnUnmount()
	const { fetchedDataLoading, fetchedDataErrorMessage } = useGetFetchedDataStatuses()

	useAutoScrollToTop()

	return (
		<RootSurface loading={fetchedDataLoading} error={fetchedDataErrorMessage}>
			<main className='reading-root'>
				<div className='reading-root__top'>
					<ReadingBreadCrumbs />
					<ReadingHeader />
				</div>
				<div className='reading-root__content'>
					<div className='reading-root__text'>
						{/*<ChapterContent />*/}
						{/*<BookAndPrevAndNextChapters />*/}
					</div>
					<div className='reading-root__analysis'>{/*<DetailsBlock />*/}</div>
				</div>
			</main>
		</RootSurface>
	)
}

export default ReadingRoot
