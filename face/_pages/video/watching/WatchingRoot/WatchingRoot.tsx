import { useRef } from 'react'
import RootSurface from '_pages/bookAndVideoCommon/RootSurface/RootSurface'
import { usePopulateWatchingStore } from './fn/fetchData'
import { useFullScreen } from './fn/fullScreen'
import { useGetFetchedDataStatuses } from './fn/getFetchedDataStatuses'
import { TextContainer, VideoContainer } from './WatchingRootContent'
import './WatchingRoot.scss'

function WatchingRoot() {
	usePopulateWatchingStore()
	const { fetchedDataLoading, fetchedDataErrorMessage } = useGetFetchedDataStatuses()

	const rootRef = useRef<null | HTMLDivElement>(null)
	useFullScreen(rootRef)

	return (
		<RootSurface loading={fetchedDataLoading} error={fetchedDataErrorMessage} rootRef={rootRef}>
			<div className='watching-root'>
				<VideoContainer />
				<TextContainer />
			</div>
		</RootSurface>
	)
}

export default WatchingRoot
