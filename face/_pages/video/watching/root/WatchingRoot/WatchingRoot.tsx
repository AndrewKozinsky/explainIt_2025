import { useRef } from 'react'
import RootSurface from '_pages/bookAndVideoCommon/RootSurface/RootSurface'
import VideoBreadCrumbs from '_pages/video/watching/root/VideoBreadCrumbs/VideoBreadCrumbs'
import { useClearWatchingStoreOnUnmount } from '_pages/video/watching/root/WatchingRoot/fn/clearStoreOnUnmount'
import VideoHeader from '../VideoHeader/VideoHeader'
import { usePopulateWatchingStore } from './fn/fetchData'
import { useFullScreen } from './fn/fullScreen'
import { useGetFetchedDataStatuses } from './fn/getFetchedDataStatuses'
import { TextContainer, VideoContainer } from './WatchingRootContent'
import './WatchingRoot.scss'

function WatchingRoot() {
	usePopulateWatchingStore()
	useClearWatchingStoreOnUnmount()
	const { fetchedDataLoading, fetchedDataErrorMessage } = useGetFetchedDataStatuses()

	const rootRef = useRef<null | HTMLDivElement>(null)
	useFullScreen(rootRef)

	return (
		<RootSurface loading={fetchedDataLoading} error={fetchedDataErrorMessage} rootRef={rootRef}>
			<main className='watching-root'>
				<div className='watching-root__top'>
					<VideoBreadCrumbs />
					<VideoHeader />
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
