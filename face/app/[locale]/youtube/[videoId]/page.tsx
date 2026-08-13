import VideoDetailsPage from '_pages/media/videoDetails/VideoDetailsPage/VideoDetailsPage'
import YouTubeVideoPage from '_pages/media/youTubeVideo/YouTubeVideoPage/YouTubeVideoPage'

export default async function Page({
	params,
	searchParams,
}: {
	params: Promise<{ videoId: string }>
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
	const { videoId } = await params
	const sp = await searchParams

	if (sp.details !== undefined) {
		// http://localhost/ru/videos/1?details
		return <VideoDetailsPage videoId={videoId} />
	}

	return <YouTubeVideoPage videoId={videoId} />
}
