// import TextRoot from '../text/TextRoot/TextRoot'
import { useWatchingStore } from '../watchingStore'

export function TextContainer() {
	const video = useWatchingStore((s) => s.video!.data)

	if (!video.processedContent) {
		return <p />
	}

	return <div className='watching-root__text-container'>{/*<TextRoot />*/}</div>
}
