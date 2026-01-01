import DeleteVideoFileButton from '_pages/video/videos/detailsSection/editPrivateVideo/DeleteVideoFileButton/DeleteVideoFileButton'
import React from 'react'

type ContentFileUploadedProps = {
	fileName: string
}

function ContentFileUploaded(props: ContentFileUploadedProps) {
	const { fileName } = props

	return (
		<div className='video-dropzone video-dropzone--file-uploading'>
			<p>{fileName}</p>
			<DeleteVideoFileButton />
		</div>
	)
}

export default ContentFileUploaded
