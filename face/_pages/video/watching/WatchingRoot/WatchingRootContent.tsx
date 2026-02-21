import { useWatchingStore } from '_pages/video/watching/watchingStore'
import TextRoot from '../text/TextRoot/TextRoot'
import VideoRoot from '../video/VideoRoot/VideoRoot'

export function VideoContainer() {
	const videoData = useWatchingStore((s) => s.video!.data)

	if (!videoData.fileUrl) {
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

export function TextContainer() {
	const video = useWatchingStore((s) => s.video!.data)

	if (!video.processedContent) {
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
