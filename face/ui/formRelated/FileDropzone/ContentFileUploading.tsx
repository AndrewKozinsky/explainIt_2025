import { filesUrls } from 'utils/filesUrls'

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
		<div className='file-dropzone file-dropzone--file-uploading'>
			<div className='file-dropzone--file-uploading-content'>
				<img src={filesUrls.images.common.filesBlue} alt='files' />
				<div className='file-dropzone__content'>
					<p className='file-dropzone__text file-dropzone__text--idle'>{fileName}</p>
					<p className='file-dropzone__sub-text file-dropzone__sub-text--uploading'>
						{uploadedMb} мб из {totalMb} мб
					</p>
				</div>
			</div>
			<div className='file-dropzone__file-uploading-progress' style={{ width: `${percent}%` }} />
		</div>
	)
}

export default ContentFileUploading
