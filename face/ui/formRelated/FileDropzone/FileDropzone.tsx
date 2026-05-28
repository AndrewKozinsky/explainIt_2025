import ContentFileDragging from './ContentFileDragging'
import ContentFileSelected from './ContentFileSelected'
import ContentFileUploading from './ContentFileUploading'
import ContentIdle from './ContentIdle'
import { FileDropzoneStatus, useFileDropzone } from './fn/useFileDropzone'
import './FileDropzone.scss'

export type FileDropzoneProps = {
	accept: Record<string, string[]>
	supportedFormatsStr: string
	idleText: string
	visible: boolean
	onGetUploadUrl: (file: File) => Promise<string | null>
	onUploadComplete: () => Promise<void>
}

function FileDropzone(props: FileDropzoneProps) {
	const { accept, supportedFormatsStr, idleText, visible, onGetUploadUrl, onUploadComplete } = props

	const { getRootProps, getInputProps, inputStatus, uploadedBytes, totalBytes, fileName } = useFileDropzone({
		accept,
		supportedFormatsStr,
		onGetUploadUrl,
		onUploadComplete,
	})

	if (!visible) {
		return null
	}

	return (
		<div {...getRootProps()} className='file-dropzone__wrapper'>
			<input {...getInputProps()} />
			{inputStatus === FileDropzoneStatus.IDLE && <ContentIdle idleText={idleText} />}
			{inputStatus === FileDropzoneStatus.FILE_DRAGGING && <ContentFileDragging />}
			{inputStatus === FileDropzoneStatus.FILE_SELECTED && <ContentFileSelected />}
			{inputStatus === FileDropzoneStatus.FILE_UPLOADING && (
				<ContentFileUploading uploadedBytes={uploadedBytes} totalBytes={totalBytes} fileName={fileName} />
			)}
		</div>
	)
}

export default FileDropzone
