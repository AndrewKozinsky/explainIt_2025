import { useVideoStore } from '_pages/media/video/videoStore'
import DeleteVideoFileButton from '../DeleteVideoFileButton/DeleteVideoFileButton'
import './FileNameAndDeleteFileButton.scss'

function FileNameAndDeleteFileButton() {
	const video = useVideoStore.getState().privateVideo.data

	if (!video || !video.isFileUploaded || !video.fileUrl) {
		return null
	}

	return (
		<div>
			<video
				src={video.fileUrl}
				controls
				preload='metadata'
				className='file-name-and-delete-file-button__video'
			/>
			<DeleteVideoFileButton />
		</div>
	)
}

export default FileNameAndDeleteFileButton
