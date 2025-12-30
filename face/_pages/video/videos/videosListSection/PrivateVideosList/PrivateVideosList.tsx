import AddVideoButton from '../AddBookButton/AddVideoButton'
import ErrorMessage from 'ui/ErrorMessage/ErrorMessage'
import LoadingMessage from 'ui/LoadingMessage/LoadingMessage'
import Paragraph from 'ui/Paragraph/Paragraph'
import { useVideosStore } from '../../videosStore'
import VideoLink from '_pages/video/videos/videosListSection/BookLink/VideoLink'

function PrivateVideosList() {
	return (
		<>
			<PrivateVideosListContent />
			<AddVideoButton />
		</>
	)
}

export default PrivateVideosList

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
			{privateVideos.data.map((book) => {
				const bookWithType = { ...book, bookType: 'private' as const }

				return <VideoLink bookData={bookWithType} key={book.id} />
			})}
		</>
	)
}
