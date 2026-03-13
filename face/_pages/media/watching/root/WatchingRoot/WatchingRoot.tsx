'use client'

import RootSurface from '_pages/media/commonComponents/RootSurface/RootSurface'
import VideoBreadCrumbs from '_pages/media/video/VideoBreadCrumbs/VideoBreadCrumbs'
import WatchingHeader from '_pages/media/watching/root/WatchingHeader/WatchingHeader'
import WatchingBreadCrumbs from '../WatchingBreadCrumbs/WatchingBreadCrumbs'
// import { useRef } from 'react'
// import VideoBreadCrumbs from '_pages/video/watching/root/VideoBreadCrumbs/VideoBreadCrumbs'
import { useClearWatchingStoreOnUnmount } from './fn/clearStoreOnUnmount'
import { useGetFetchedDataStatuses } from './fn/getFetchedDataStatuses'
import { usePopulateWatchingStore } from './fn/populateStore'
// import { useDetailsStickyTopBelowVideo } from './fn/useDetailsStickyTopBelowVideo'
// import { TextContainer, VideoContainer } from './WatchingRootContent'
import './WatchingRoot.scss'

function WatchingRoot() {
	usePopulateWatchingStore()
	useClearWatchingStoreOnUnmount()
	const { fetchedDataLoading, fetchedDataErrorMessage } = useGetFetchedDataStatuses()

	// const rootRef = useRef<null | HTMLDivElement>(null)
	// useDetailsStickyTopBelowVideo(rootRef)

	return (
		<RootSurface loading={fetchedDataLoading} error={fetchedDataErrorMessage}>
			<main className='watching-root'>
				<div className='watching-root__top'>
					<WatchingBreadCrumbs />
					<WatchingHeader />
				</div>
				<div className='watching-root__content'>
					{/*<VideoContainer />*/}
					{/*<TextContainer />*/}
				</div>
			</main>
		</RootSurface>
	)
}

export default WatchingRoot
