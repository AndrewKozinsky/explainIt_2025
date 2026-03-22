'use client'

import { useRef } from 'react'
import RootSurface from '_pages/media/commonComponents/RootSurface/RootSurface'
import WatchingHeader from '_pages/media/watching/WatchingHeader/WatchingHeader'
import WatchingBreadCrumbs from '../WatchingBreadCrumbs/WatchingBreadCrumbs'
import { useClearWatchingStoreOnUnmount } from './fn/clearStoreOnUnmount'
import { useGetFetchedDataStatuses } from './fn/getFetchedDataStatuses'
import { usePopulateWatchingStore } from './fn/populateStore'
import { useDetailsStickyTopBelowVideo } from './fn/useDetailsStickyTopBelowVideo'
import { TextContainer, VideoContainer } from './WatchingRootContent'
import './WatchingRoot.scss'

function WatchingRoot() {
	usePopulateWatchingStore()
	useClearWatchingStoreOnUnmount()
	const { fetchedDataLoading, fetchedDataErrorMessage } = useGetFetchedDataStatuses()

	const rootRef = useRef<null | HTMLDivElement>(null)
	useDetailsStickyTopBelowVideo(rootRef)

	return (
		<RootSurface loading={fetchedDataLoading} error={fetchedDataErrorMessage} rootRef={rootRef}>
			<main className='watching-root'>
				<div className='watching-root__top'>
					<WatchingBreadCrumbs />
					<WatchingHeader />
				</div>
				<div className='watching-root__content'>
					<VideoContainer />
					<TextContainer />
				</div>
			</main>
		</RootSurface>
	)
}

export default WatchingRoot
