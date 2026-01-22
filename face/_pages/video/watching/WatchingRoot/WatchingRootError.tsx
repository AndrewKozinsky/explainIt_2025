import { useWatchingStore } from '_pages/video/watching/watchingStore'
import ErrorMessage from 'ui/ErrorMessage/ErrorMessage'

function WatchingRootError() {
	const videoErrorMessage = useWatchingStore((s) => s.video?.errorMessage)
	if (!videoErrorMessage) return null

	return (
		<div className='watching-root__center'>
			<ErrorMessage text={videoErrorMessage} />
		</div>
	)
}

export default WatchingRootError
