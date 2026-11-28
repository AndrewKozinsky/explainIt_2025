import { useId } from 'react'
import cn from 'classnames'
import { useFormatter, useTranslations } from 'next-intl'
import BaseButton from '../buttons/BaseButton/BaseButton'
import LabelWithField from '../LabelWithField/LabelWithField'
import FileDropzoneIcon from './FileDropzoneIcon'
import { FileDropzoneStatus, useFileDropzone, type UseFileDropzoneParams } from './fn/useFileDropzone'
import './FileDropzone.scss'

export type FileDropzoneProps = UseFileDropzoneParams & {
	block?: boolean
	label?: string
	extraClass?: string
	visible: boolean
	tracksUploadProgress?: boolean
	processingMessage?: string
}

function FileDropzone(props: FileDropzoneProps) {
	const {
		block,
		label,
		supportedFormatsStr,
		visible,
		disabled,
		onUploadFile,
		extraClass,
		tracksUploadProgress,
		processingMessage,
	} = props
	const t = useTranslations('fileDropzone')
	const format = useFormatter()

	const captionId = useId()
	const messageId = useId()

	const { getRootProps, getInputProps, open, inputStatus, uploadedBytes, totalBytes, fileName, errorMessage } =
		useFileDropzone(props, { notifyOnError: false })

	if (!visible) {
		return null
	}

	const isDragging = inputStatus === FileDropzoneStatus.FILE_DRAGGING
	const isProcessing = inputStatus === FileDropzoneStatus.FILE_PROCESSING
	const isUploading =
		inputStatus === FileDropzoneStatus.FILE_UPLOADING ||
		inputStatus === FileDropzoneStatus.FILE_SELECTED ||
		isProcessing
	const showError = Boolean(errorMessage) && !isDragging && !isUploading
	const showStatus = showError || isUploading
	const isDisabled = disabled || isUploading
	const indeterminate = isProcessing || Boolean(onUploadFile && !tracksUploadProgress)
	const percent = totalBytes > 0 ? Math.min(100, (uploadedBytes / totalBytes) * 100) : 0
	const chooseFile = t('chooseFile')
	let message = chooseFile
	let caption = supportedFormatsStr

	if (isDragging) {
		message = t('dropFile')
	} else if (isUploading) {
		if (isProcessing && processingMessage) {
			message = processingMessage
		} else if (indeterminate) {
			message = t('uploading')
		} else {
			const bytesPerMb = 1024 * 1024
			const [unit, unitBytes] = totalBytes >= bytesPerMb ? ['megabyte', bytesPerMb] : ['kilobyte', 1024]
			const numberOptions = { style: 'unit', unit, maximumFractionDigits: 1 } as const
			message = t('uploadProgress', {
				uploaded: format.number(uploadedBytes / unitBytes, numberOptions),
				total: format.number(totalBytes / unitBytes, numberOptions),
			})
		}

		caption = fileName
	} else if (errorMessage) {
		message = errorMessage
		caption = t('tryAgain')
	}

	const showCaption = Boolean(supportedFormatsStr && caption)
	const describedBy = [showStatus && messageId, showCaption && captionId].filter(Boolean).join(' ') || undefined

	return (
		<LabelWithField label={label} block={block} disabled={disabled && !isUploading}>
			<div className='file-dropzone__wrapper'>
				<div {...getRootProps()}>
					<input {...getInputProps()} disabled={isDisabled} aria-hidden />
					<BaseButton
						theme='outline'
						extraClass={cn('file-dropzone', extraClass, {
							'file-dropzone--dragging': isDragging,
							'file-dropzone--uploading': isUploading,
							'file-dropzone--error': showError,
						})}
						aria-label={label ? `${label}. ${chooseFile}` : chooseFile}
						aria-describedby={describedBy}
						disabled={isDisabled}
						onClick={open}
					>
						{isUploading && (
							<span
								className={cn('file-dropzone__progress', {
									'file-dropzone__progress--indeterminate': indeterminate,
								})}
								style={indeterminate ? undefined : { width: `${percent}%` }}
								aria-hidden
							/>
						)}
						<FileDropzoneIcon outline={isDragging} error={showError} />
						<span id={messageId} className='file-dropzone__message'>
							{message}
						</span>
					</BaseButton>
				</div>
				{showCaption && (
					<p
						id={captionId}
						className={cn('file-dropzone__caption', isUploading && 'file-dropzone__caption--filename')}
						title={isUploading ? fileName : undefined}
					>
						{caption}
					</p>
				)}
				<span className='file-dropzone__announcement' aria-live='polite'>
					{showStatus && message}
				</span>
			</div>
		</LabelWithField>
	)
}

export default FileDropzone
