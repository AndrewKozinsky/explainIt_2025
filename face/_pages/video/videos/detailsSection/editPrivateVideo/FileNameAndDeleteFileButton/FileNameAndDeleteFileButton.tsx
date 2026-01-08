import React from 'react'
import DeleteVideoFileButton from '_pages/video/videos/detailsSection/editPrivateVideo/DeleteVideoFileButton/DeleteVideoFileButton'
import { useVideosStore } from '_pages/video/videos/videosStore'
import './FileNameAndDeleteFileButton.scss'

function FileNameAndDeleteFileButton() {
	const video = useVideosStore.getState().privateVideo

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
