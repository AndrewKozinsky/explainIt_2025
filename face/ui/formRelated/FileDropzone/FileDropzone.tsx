import LabelWithField from 'ui/formRelated/LabelWithField/LabelWithField'
import ContentFileDragging from './ContentFileDragging'
// import ContentFileSelected from './ContentFileSelected'
import ContentFileUploading from './ContentFileUploading'
import ContentIdle from './ContentIdle'
import { FileDropzoneStatus, useFileDropzone } from './fn/useFileDropzone'
import './FileDropzone.scss'

export type FileDropzoneProps = {
	label: string
	accept: Record<string, string[]>
	supportedFormatsStr: string
	visible: boolean
	onGetUploadUrl: (file: File) => Promise<string | null>
	onUploadComplete: () => Promise<void>
}

function FileDropzone(props: FileDropzoneProps) {
	const { label, accept, supportedFormatsStr, visible, onGetUploadUrl, onUploadComplete } = props

	const { getRootProps, getInputProps, inputStatus, uploadedBytes, totalBytes, fileName } = useFileDropzone({
		accept,
		supportedFormatsStr,
		onGetUploadUrl,
		onUploadComplete,
	})

	if (!visible) {
		return null
	}

	const isIdleStatus = inputStatus === FileDropzoneStatus.IDLE
	const isDraggingStatus = inputStatus === FileDropzoneStatus.FILE_DRAGGING
	const isUploadingStatus =
		inputStatus === FileDropzoneStatus.FILE_UPLOADING || inputStatus === FileDropzoneStatus.FILE_SELECTED

	return (
		<LabelWithField label={label}>
			<div {...getRootProps()} className='file-dropzone__wrapper'>
				<input {...getInputProps()} />
				{isIdleStatus && <ContentIdle supportedFormatsStr={supportedFormatsStr} />}
				{isDraggingStatus && <ContentFileDragging />}
				{isUploadingStatus && (
					<ContentFileUploading uploadedBytes={uploadedBytes} totalBytes={totalBytes} fileName={fileName} />
				)}
			</div>
		</LabelWithField>
	)
}

export default FileDropzone
