import ErrorMessage from 'ui/ErrorMessage/ErrorMessage'
import LoadingMessage from 'ui/LoadingMessage/LoadingMessage'
import Paragraph from 'ui/Paragraph/Paragraph'
import VideoLink from '_pages/video/videos/videosListSection/VideoLink/VideoLink'
import { useVideosStore } from '../../videosStore'

function PrivateVideosListContent() {
	const privateVideos = useVideosStore((state) => state.privateVideos)

	if (privateVideos.loading) {
		return <LoadingMessage text='Загрузка...' />
	} else if (privateVideos.errorMessage) {
		return <ErrorMessage text={privateVideos.errorMessage} />
	} else if (!privateVideos.data.length) {
		return <Paragraph fontSize={16}>Не создано ни одного видео</Paragraph>
	}

	return (
		<>
			{privateVideos.data.map((video) => {
				const videoWithType = { ...video, videoType: 'private' as const }

				return <VideoLink videoData={videoWithType} key={video.id} />
			})}
		</>
	)
}

export default PrivateVideosListContent
