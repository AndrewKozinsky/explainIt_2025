'use client'

import DetailsBlock from '_pages/media/commonComponents/detailsBlock/DetailsBlock/DetailsBlock'
import RootSurface from '_pages/media/commonComponents/RootSurface/RootSurface'
import ReadingBottomNavigation from '_pages/media/reading/ReadingBottomNavigation/ReadingBottomNavigation'
import ChapterContent from '../ChapterContent/ChapterContent'
import ReadingBreadCrumbs from '../ReadingBreadCrumbs/ReadingBreadCrumbs'
import ReadingHeader from '../ReadingHeader/ReadingHeader'
import { useAutoScrollToTop } from './fn/autoScrollToTop'
import { useClearReadingStoreOnUnmount } from './fn/clearStoreOnUnmount'
import { useGetFetchedDataStatuses } from './fn/getFetchedDataStatuses'
import { usePopulateReadingStore } from './fn/populateStore'
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
						<ChapterContent />
						<ReadingBottomNavigation />
					</div>
					<div className='reading-root__analysis'>
						<DetailsBlock />
					</div>
				</div>
			</main>
		</RootSurface>
	)
}

export default ReadingRoot
