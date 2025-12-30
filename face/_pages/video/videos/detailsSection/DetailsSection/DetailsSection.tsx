import NoteText from '../../common/NoteText/NoteText'
import EditPrivateVideoForm from '../editPrivateBook/EditPrivateBookForm/EditPrivateBookForm'
import { useVideosStore } from '_pages/video/videos/videosStore'

function DetailsSection() {
	const pageUrlType = useVideosStore((s) => s.pageUrlType)
	const privateVideo = useVideosStore((s) => s.privateVideo)

	if (pageUrlType === 'videos') {
		return <NoteText>Выберите книгу или главу для просмотра детальной информации.</NoteText>
	}

	return (
		<div className='editable-form-section'>
			{pageUrlType === 'video' && privateVideo && <EditPrivateVideoForm />}
		</div>
	)
}

export default DetailsSection
