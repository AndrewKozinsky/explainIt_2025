import VideoPlayer from '../VideoPlayer/VideoPlayer'
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
