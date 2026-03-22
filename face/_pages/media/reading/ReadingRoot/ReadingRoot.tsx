'use client'

import DetailsBlock from '_pages/media/commonComponents/detailsBlock/DetailsBlock/DetailsBlock'
import RootSurface from '_pages/media/commonComponents/RootSurface/RootSurface'
import ChapterContent from '../ChapterContent/ChapterContent'
import ReadingBottomNavigation from '../ReadingBottomNavigation/ReadingBottomNavigation'
import ReadingBreadCrumbs from '../ReadingBreadCrumbs/ReadingBreadCrumbs'
import ReadingHeader from '../ReadingHeader/ReadingHeader'
import { useClearReadingStoreOnUnmount } from './fn/clearStoreOnUnmount'
import { useGetFetchedDataStatuses } from './fn/getFetchedDataStatuses'
import { usePopulateReadingStore } from './fn/populateStore'
import { useSyncDetailsTranslation } from './fn/useSyncDetailsTranslation'
import './ReadingRoot.scss'

function ReadingRoot() {
	usePopulateReadingStore()
	useClearReadingStoreOnUnmount()
	useSyncDetailsTranslation()
	const { fetchedDataLoading, fetchedDataErrorMessage } = useGetFetchedDataStatuses()

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
						<DetailsBlock mediaType='reading' />
					</div>
				</div>
			</main>
		</RootSurface>
	)
}

export default ReadingRoot
