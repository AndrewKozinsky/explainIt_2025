import VideoRoot from '_pages/video/watching/video/VideoRoot/VideoRoot'
import { useWatchingStore } from '_pages/video/watching/watchingStore'
import TextRoot from '../text/TextRoot/TextRoot'

function WatchingRootContent() {
	const video = useWatchingStore((s) => s.video?.data)
	if (!video) return null

	return (
		<div className='watching-root__content'>
			<VideoContainer />
			<TextContainer />
		</div>
	)
}

export default WatchingRootContent

function VideoContainer() {
	const video = useWatchingStore((s) => s.video!.data)

	if (!video.fileUrl || !video.isFileUploaded) {
		return (
			<div className='watching-root__no-video'>
				<p>no video</p>
			</div>
		)
	}

	return (
		<div className='watching-root__video-container'>
			<VideoRoot />
		</div>
	)
}

function TextContainer() {
	const video = useWatchingStore((s) => s.video!.data)

	if (!video.text) {
		return (
			<div className='watching-root__no-text'>
				<p>no text</p>
			</div>
		)
	}

	return (
		<div className='watching-root__text-container'>
			<TextRoot />
		</div>
	)
}
