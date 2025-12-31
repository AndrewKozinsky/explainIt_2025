import React from 'react'
import SuccessMessage from 'ui/SuccessMessage/SuccessMessage'

function ContentFileUploaded() {
	return (
		<div className='video-dropzone video-dropzone--file-uploading'>
			<SuccessMessage text='2025-11-03 18-56-49.mov успешно загружен' />
		</div>
	)
}

export default ContentFileUploaded
