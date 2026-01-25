import React from 'react'

type ContentFileUploadingProps = {
	uploadedBytes: number
	totalBytes: number
	fileName: string
}

function ContentFileUploading(props: ContentFileUploadingProps) {
	const { uploadedBytes, totalBytes, fileName } = props

	const uploadedMb = Math.round(uploadedBytes / 1024 / 1024)
	const totalMb = Math.round(totalBytes / 1024 / 1024)

	const percent = Math.round((uploadedBytes / totalBytes) * 100)

	return (
		<div className='video-dropzone video-dropzone--file-uploaded'>
			<p className='video-dropzone__file-uploading-top'>
				<span>{fileName}</span>
				<span>
					{uploadedMb} мб из {totalMb} мб
				</span>
			</p>
			<div className='video-dropzone__file-uploading-bar'>
				<div className='video-dropzone__file-uploading-progress' style={{ width: `${percent}%` }} />
			</div>
			<p>Не закрывайте окно до полной загрузку файла</p>
		</div>
	)
}

export default ContentFileUploading
