import YouTubeVideoPage from '_pages/media/youTubeVideo/YouTubeVideoPage/YouTubeVideoPage'

export default async function Page({ params }: { params: Promise<{ videoId: string }> }) {
	const { videoId } = await params

	return <YouTubeVideoPage videoId={videoId} />
}
