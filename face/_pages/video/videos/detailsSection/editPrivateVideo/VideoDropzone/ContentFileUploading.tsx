import React from 'react'

type ContentFileUploadingProps = {
	percentage: number
}

function ContentFileUploading(props: ContentFileUploadingProps) {
	const { percentage } = props

	return (
		<div className='video-dropzone video-dropzone--file-uploaded'>
			<p className='video-dropzone__file-uploading-top'>
				<span>2025-11-03 18-56-49.mov</span>
				<span>5 мб из 550 мб</span>
			</p>
			<div className='video-dropzone__file-uploading-bar'>
				<div className='video-dropzone__file-uploading-progress' style={{ width: `${percentage}%` }} />
			</div>
			<p>Не закрывайте окно до полной загрузку файла</p>
		</div>
	)
}

export default ContentFileUploading
