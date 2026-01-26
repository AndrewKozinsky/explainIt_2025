import Spinner from 'ui/Spinner/Spinner'
import { useWatchingStore } from '_pages/video/watching/watchingStore'

function WatchingRootLoading() {
	const isVideoLoading = useWatchingStore((s) => s.video?.loading)
	if (!isVideoLoading) return null

	return (
		<div className='watching-root__center'>
			<Spinner />
		</div>
	)
}

export default WatchingRootLoading
