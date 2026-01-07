import { useRef } from 'react'
import { useFullScreen } from './fn/fullScreen'
import { usePopulateWatchingStore } from './fn/getContentStructure'
import { useSetDeviceType } from './fn/setDeviceType'
import WatchingRootContent from './WatchingRootContent'
import WatchingRootError from './WatchingRootError'
import WatchingRootLoading from './WatchingRootLoading'
import { useRegisterCmdKeyListener } from './fn/registerCmdKeyListener'
import './WatchingRoot.scss'

function WatchingRoot() {
	const rootRef = useRef<null | HTMLDivElement>(null)
	useFullScreen(rootRef)

	usePopulateWatchingStore()
	useSetDeviceType()
	useRegisterCmdKeyListener()

	return (
		<div className='watching-root' ref={rootRef}>
			<WatchingRootLoading />
			<WatchingRootError />
			<WatchingRootContent />
		</div>
	)
}

export default WatchingRoot
