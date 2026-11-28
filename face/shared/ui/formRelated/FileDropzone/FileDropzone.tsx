import { useId } from 'react'
import cn from 'classnames'
import { useTranslations } from 'next-intl'
import LabelWithField from '../LabelWithField/LabelWithField'
import FileDropzoneIcon from './FileDropzoneIcon'
import { FileDropzoneStatus, useFileDropzone, type UseFileDropzoneParams } from './fn/useFileDropzone'
import './FileDropzone.scss'

export type FileDropzoneProps = UseFileDropzoneParams & {
	block?: boolean
	label: string
	visible: boolean
}

function FileDropzone(props: FileDropzoneProps) {
	const { block, label, supportedFormatsStr, visible, disabled, onUploadFile } = props
	const t = useTranslations('fileDropzone')
	const captionId = useId()
	const messageId = useId()
	const { getRootProps, getInputProps, inputStatus, uploadedBytes, totalBytes, fileName, errorMessage } =
		useFileDropzone(props, { notifyOnError: false })

	if (!visible) {
		return null
	}

	const isDragging = inputStatus === FileDropzoneStatus.FILE_DRAGGING
	const isUploading =
		inputStatus === FileDropzoneStatus.FILE_UPLOADING || inputStatus === FileDropzoneStatus.FILE_SELECTED
	const showError = Boolean(errorMessage) && !isDragging && !isUploading
	const isDisabled = disabled || isUploading
	const indeterminate = Boolean(onUploadFile)
	const percent = totalBytes > 0 ? Math.min(100, Math.round((uploadedBytes / totalBytes) * 100)) : 0
	const bytesPerMb = 1024 * 1024
	const chooseFile = t('chooseFile')
	let message = chooseFile
	let caption = supportedFormatsStr

	if (isDragging) {
		message = t('dropFile')
	} else if (isUploading) {
		if (indeterminate) {
			message = t('uploading')
		} else {
			message = t('uploadProgress', {
				uploadedMb: Math.round(uploadedBytes / bytesPerMb),
				totalMb: Math.round(totalBytes / bytesPerMb),
			})
		}

		caption = fileName
	} else if (errorMessage) {
		message = errorMessage
		caption = t('tryAgain')
	}

	return (
		<LabelWithField label={label} block={block} disabled={disabled}>
			<div className='file-dropzone__wrapper'>
				<div
					{...getRootProps({
						className: cn('file-dropzone', {
							'file-dropzone--dragging': isDragging,
							'file-dropzone--uploading': isUploading,
							'file-dropzone--error': showError,
						}),
						role: 'button',
						'aria-label': `${label}. ${chooseFile}`,
						'aria-describedby': showError || isUploading ? `${messageId} ${captionId}` : captionId,
						'aria-disabled': isDisabled,
					})}
				>
					<input {...getInputProps()} disabled={isDisabled} aria-hidden />
					{isUploading && (
						<div
							className={cn(
								'file-dropzone__progress',
								indeterminate && 'file-dropzone__progress--indeterminate',
							)}
							style={indeterminate ? undefined : { width: `${percent}%` }}
							aria-hidden
						/>
					)}
					<FileDropzoneIcon outline={isDragging} error={showError} />
					<p id={messageId} className='file-dropzone__message'>
						{message}
					</p>
				</div>
				<p
					id={captionId}
					className={cn('file-dropzone__caption', isUploading && 'file-dropzone__caption--filename')}
					title={isUploading ? fileName : undefined}
				>
					{caption}
				</p>
				<span className='file-dropzone__announcement' aria-live='polite'>
					{(showError || isUploading) && message}
				</span>
			</div>
		</LabelWithField>
	)
}

export default FileDropzone
