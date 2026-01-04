import { usePopulateWatchingStore } from './fn/getContentStructure'
import { useSetDeviceType } from './fn/setDeviceType'
import WatchingRootContent from './WatchingRootContent'
import WatchingRootError from './WatchingRootError'
import WatchingRootLoading from './WatchingRootLoading'
import './WatchingRoot.scss'

function WatchingRoot() {
	usePopulateWatchingStore()
	useSetDeviceType()

	return (
		<div className='watching-root'>
			<WatchingRootLoading />
			<WatchingRootError />
			<WatchingRootContent />
		</div>
	)
}

export default WatchingRoot
