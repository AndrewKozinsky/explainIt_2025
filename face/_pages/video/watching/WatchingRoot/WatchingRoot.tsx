import { useRef } from 'react'
// import { usePopulateWatchingStore } from '_pages/video/watching/WatchingRoot/fn/fetchData'
// import { useFullScreen } from './fn/fullScreen'
// import { useRegisterCmdKeyListener } from './fn/registerCmdKeyListener'
// import { useSetDeviceType } from './fn/setDeviceType'
// import WatchingRootContent from './WatchingRootContent'
// import WatchingRootError from './WatchingRootError'
// import WatchingRootLoading from './WatchingRootLoading'
// import './WatchingRoot.scss'

function WatchingRoot() {
	const rootRef = useRef<null | HTMLDivElement>(null)
	// useFullScreen(rootRef)

	// usePopulateWatchingStore()
	// useSetDeviceType()
	// useRegisterCmdKeyListener()

	return (
		<div className='watching-root' ref={rootRef}>
			{/*<WatchingRootLoading />*/}
			{/*<WatchingRootError />*/}
			{/*<WatchingRootContent />*/}
		</div>
	)
}

export default WatchingRoot
