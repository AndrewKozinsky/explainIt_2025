import VideoPage from '_pages/media/video/VideoPage/VideoPage'
import VideoDetailsPage from '_pages/media/videoDetails/VideoDetailsPage/VideoDetailsPage'

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

	return <VideoPage videoId={videoId} />
}
