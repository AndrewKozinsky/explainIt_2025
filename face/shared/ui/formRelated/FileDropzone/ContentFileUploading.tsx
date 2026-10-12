import { filesUrls } from '@/shared/utils/filesUrls'

type ContentFileUploadingProps = {
	uploadedBytes: number
	totalBytes: number
	fileName: string
	indeterminate?: boolean
}

function ContentFileUploading(props: ContentFileUploadingProps) {
	const { uploadedBytes, totalBytes, fileName, indeterminate } = props

	const uploadedMb = Math.round(uploadedBytes / 1024 / 1024)
	const totalMb = Math.round(totalBytes / 1024 / 1024)

	const percent = totalBytes > 0 ? Math.round((uploadedBytes / totalBytes) * 100) : 0

	return (
		<div className='file-dropzone file-dropzone--file-uploading' role='status' aria-live='polite'>
			<div className='file-dropzone--file-uploading-content'>
				<img src={filesUrls.images.common.filesBlue} alt='files' />
				<div className='file-dropzone__content'>
					<p className='file-dropzone__text file-dropzone__text--idle'>{fileName}</p>
					<p className='file-dropzone__sub-text file-dropzone__sub-text--uploading'>
						{indeterminate ? 'Загрузка и обработка фотографии…' : `${uploadedMb} мб из ${totalMb} мб`}
					</p>
				</div>
			</div>
			<div
				className={
					indeterminate
						? 'file-dropzone__file-uploading-progress file-dropzone__file-uploading-progress--indeterminate'
						: 'file-dropzone__file-uploading-progress'
				}
				style={indeterminate ? undefined : { width: `${percent}%` }}
			/>
		</div>
	)
}

export default ContentFileUploading
