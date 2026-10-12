import LabelWithField from '../LabelWithField/LabelWithField'
import ContentFileDragging from './ContentFileDragging'
import ContentFileUploading from './ContentFileUploading'
import ContentIdle from './ContentIdle'
import { FileDropzoneStatus, useFileDropzone, type UseFileDropzoneParams } from './fn/useFileDropzone'
import './FileDropzone.scss'

export type FileDropzoneProps = UseFileDropzoneParams & {
	block?: boolean
	label: string
	visible: boolean
}

function FileDropzone(props: FileDropzoneProps) {
	const { block, label, supportedFormatsStr, visible, disabled, onUploadFile } = props

	const { getRootProps, getInputProps, inputStatus, uploadedBytes, totalBytes, fileName } = useFileDropzone(props)

	if (!visible) {
		return null
	}

	const isIdleStatus = inputStatus === FileDropzoneStatus.IDLE
	const isDraggingStatus = inputStatus === FileDropzoneStatus.FILE_DRAGGING
	const isUploadingStatus =
		inputStatus === FileDropzoneStatus.FILE_UPLOADING || inputStatus === FileDropzoneStatus.FILE_SELECTED

	return (
		<LabelWithField label={label} block={block} disabled={disabled}>
			<div {...getRootProps()} className='file-dropzone__wrapper' aria-disabled={disabled || isUploadingStatus}>
				<input {...getInputProps()} disabled={disabled || isUploadingStatus} />
				{isIdleStatus && <ContentIdle supportedFormatsStr={supportedFormatsStr} />}
				{isDraggingStatus && <ContentFileDragging />}
				{isUploadingStatus && (
					<ContentFileUploading
						uploadedBytes={uploadedBytes}
						totalBytes={totalBytes}
						fileName={fileName}
						indeterminate={Boolean(onUploadFile)}
					/>
				)}
			</div>
		</LabelWithField>
	)
}

export default FileDropzone
