// 'use client'

// import { useRef } from 'react'
// import OnboardingModal from '_pages/media/commonComponents/OnboardingModal/OnboardingModal'
// import RootSurface from '_pages/media/commonComponents/RootSurface/RootSurface'
// import WatchingTop from '_pages/media/watching/WatchingTop/WatchingTop'
// import { useClearWatchingStoreOnUnmount } from './fn/clearStoreOnUnmount'
// import { useGetFetchedDataStatuses } from './fn/getFetchedDataStatuses'
// import { usePopulateWatchingStore } from './fn/populateStore'
// import { useDetailsStickyTopBelowVideo } from './fn/useDetailsStickyTopBelowVideo'
// import { TextContainer, VideoContainer } from './WatchingRootContent'
// import './WatchingRoot.scss'

/*function WatchingRoot() {
	usePopulateWatchingStore()
	useClearWatchingStoreOnUnmount()
	const { fetchedDataLoading, fetchedDataErrorMessage } = useGetFetchedDataStatuses()

	const rootRef = useRef<null | HTMLDivElement>(null)
	useDetailsStickyTopBelowVideo(rootRef)

	return (
		<RootSurface loading={fetchedDataLoading} error={fetchedDataErrorMessage} rootRef={rootRef}>
			<main className='watching-root'>
				<OnboardingModal />
				<WatchingTop />
				<div className='watching-root__content'>
					<VideoContainer />
					<TextContainer />
				</div>
			</main>
		</RootSurface>
	)
}*/

// export default WatchingRoot
