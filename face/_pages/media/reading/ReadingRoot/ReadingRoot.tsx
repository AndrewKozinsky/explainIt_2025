'use client'

import OnboardingModal from '_pages/media/commonComponents/OnboardingModal/OnboardingModal'
import RootSurface from '_pages/media/commonComponents/RootSurface/RootSurface'
import DetailsBlock from '_pages/media/detailsBlock/DetailsBlock/DetailsBlock'
import ReadingTop from '_pages/media/reading/ReadingTop/ReadingTop'
import ChapterContent from '../ChapterContent/ChapterContent'
import ReadingBottomNavigation from '../ReadingBottomNavigation/ReadingBottomNavigation'
import { useClearReadingStoreOnUnmount } from './fn/clearStoreOnUnmount'
import { useGetFetchedDataStatuses } from './fn/getFetchedDataStatuses'
import { usePopulateReadingStore } from './fn/populateStore'
import './ReadingRoot.scss'

function ReadingRoot() {
	usePopulateReadingStore()
	useClearReadingStoreOnUnmount()
	const { fetchedDataLoading, fetchedDataErrorMessage } = useGetFetchedDataStatuses()

	return (
		<RootSurface loading={fetchedDataLoading} error={fetchedDataErrorMessage}>
			<main className='reading-root'>
				<OnboardingModal />
				<ReadingTop />
				<div className='reading-root__content'>
					<ChapterContent />
					<div className='reading-root__analysis'>
						<DetailsBlock mediaType='reading' />
					</div>
				</div>
				<ReadingBottomNavigation />
			</main>
		</RootSurface>
	)
}

export default ReadingRoot
