import VideoPlayer from '_pages/media/watching/VideoPlayer/VideoPlayer'
import TextRoot from '../text/TextRoot/TextRoot'
import { useWatchingStore } from '../watchingStore'

export function VideoContainer() {
	const videoData = useWatchingStore((s) => s.video!.data)

	if (!videoData.fileUrl) {
		return <p>no video</p>
	}

	return (
		<div className='watching-root__video-container'>
			<VideoPlayer />
		</div>
	)
}

export function TextContainer() {
	const video = useWatchingStore((s) => s.video!.data)

	if (!video.processedContent) {
		return <p />
	}

	return (
		<div className='watching-root__text-container'>
			<TextRoot />
		</div>
	)
}
