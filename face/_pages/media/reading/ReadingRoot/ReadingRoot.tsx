'use client'

import OnboardingModal from '_pages/media/commonComponents/OnboardingModal/OnboardingModal'
import RootSurface from '_pages/media/commonComponents/RootSurface/RootSurface'
import { useReadingStore } from '../readingStore'
import ReadingTop from '../ReadingTop/ReadingTop'
import EmptyChapterMessage from './EmptyChapterMessage'
import { useClearReadingStoreOnUnmount } from './fn/clearStoreOnUnmount'
import { useGetFetchedDataStatuses } from './fn/getFetchedDataStatuses'
import { usePopulateReadingStore } from './fn/populateStore'
import ReadingContent from './ReadingContent'
import './ReadingRoot.scss'

function ReadingRoot() {
	usePopulateReadingStore()
	useClearReadingStoreOnUnmount()
	const { fetchedDataLoading, fetchedDataErrorMessage } = useGetFetchedDataStatuses()

	const populatedChapter = useReadingStore((s) => s.populatedChapter)
	const hasContent = populatedChapter && populatedChapter.sentences.length > 0

	return (
		<RootSurface loading={fetchedDataLoading} error={fetchedDataErrorMessage}>
			<main className='reading-root'>
				<OnboardingModal />
				<ReadingTop />
				{hasContent ? <ReadingContent /> : <EmptyChapterMessage />}
			</main>
		</RootSurface>
	)
}

export default ReadingRoot
