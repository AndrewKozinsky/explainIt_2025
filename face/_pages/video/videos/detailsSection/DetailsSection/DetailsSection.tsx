import NoteText from '_pages/bookAndVideoCommon/NoteText/NoteText'
import PublicVideoInfo from '_pages/video/videos/detailsSection/PublicVideoInfo/PublicVideoInfo'
import { useVideosStore } from '_pages/video/videos/videosStore'
// import EditPrivateVideoForm from '../editPrivateVideo/EditPrivateVideoForm/EditPrivateBookForm'

function DetailsSection() {
	const pageUrlType = useVideosStore((s) => s.pageUrlType)
	const publicVideo = useVideosStore((s) => s.publicVideo)
	const privateVideo = useVideosStore((s) => s.privateVideo)

	if (pageUrlType === 'videos') {
		return <NoteText>Выберите видео для просмотра детальной информации.</NoteText>
	}

	return (
		<div className='editable-form-section'>
			{pageUrlType === 'video' && publicVideo && <PublicVideoInfo />}
			{/*{pageUrlType === 'video' && privateVideo && <EditPrivateVideoForm />}*/}
		</div>
	)
}

export default DetailsSection
