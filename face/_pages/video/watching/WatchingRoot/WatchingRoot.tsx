import { useRef } from 'react'
// import { usePopulateWatchingStore } from './fn/fetchData'
// import { useFullScreen } from './fn/fullScreen'
// import WatchingRootContent from './WatchingRootContent'
// import WatchingRootError from './WatchingRootError'
// import WatchingRootLoading from './WatchingRootLoading'
// import './WatchingRoot.scss'

function WatchingRoot() {
	const rootRef = useRef<null | HTMLDivElement>(null)
	// useFullScreen(rootRef)

	// usePopulateWatchingStore()

	return (
		<div className='watching-root' ref={rootRef}>
			{/*<WatchingRootLoading />*/}
			{/*<WatchingRootError />*/}
			{/*<WatchingRootContent />*/}
		</div>
	)
}

export default WatchingRoot
