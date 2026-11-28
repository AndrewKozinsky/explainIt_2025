import { useContext, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import { useDropzone } from 'react-dropzone'
import { NotificationContext } from '@/shared/ui/Notification/fn/context'
import { uploadBySignedUrl } from './uploadBySignedUrl'

export enum FileDropzoneStatus {
	IDLE,
	FILE_DRAGGING,
	FILE_SELECTED,
	FILE_UPLOADING,
}

type FileUploadHandlers =
	| { onUploadFile: (file: File) => Promise<void>; onGetUploadUrl?: never; onUploadComplete?: never }
	| {
			onUploadFile?: never
			onGetUploadUrl: (file: File) => Promise<string | null>
			onUploadComplete: () => Promise<void>
	  }

export type UseFileDropzoneParams = FileUploadHandlers & {
	accept: Record<string, string[]>
	supportedFormatsStr: string
	disabled?: boolean
	maxSize?: number
	noClick?: boolean
	noKeyboard?: boolean
}

export function useFileDropzone(params: UseFileDropzoneParams, { notifyOnError = true } = {}) {
	const { accept, supportedFormatsStr, disabled, maxSize } = params
	const t = useTranslations('fileDropzone')
	const { notify } = useContext(NotificationContext)
	const uploading = useRef(false)
	const [inputStatus, setInputStatus] = useState(FileDropzoneStatus.IDLE)
	const [uploadedBytes, setUploadedBytes] = useState(0)
	const [totalBytes, setTotalBytes] = useState(0)
	const [fileName, setFileName] = useState('')
	const [errorMessage, setErrorMessage] = useState<string | null>(null)

	const isUploading =
		inputStatus === FileDropzoneStatus.FILE_SELECTED || inputStatus === FileDropzoneStatus.FILE_UPLOADING

	async function uploadFile(file: File) {
		if (params.onUploadFile) {
			return params.onUploadFile(file)
		}

		const uploadUrl = await params.onGetUploadUrl(file)
		if (!uploadUrl) throw new Error(t('uploadUrlError'))

		await uploadBySignedUrl(uploadUrl, file, function (loaded, total) {
			setUploadedBytes(loaded)
			setTotalBytes(total)
		}).catch(function (cause) {
			throw new Error(t('uploadError'), { cause })
		})

		await params.onUploadComplete()
	}

	function reportError(message: string) {
		setErrorMessage(message)

		if (notifyOnError) {
			notify({ type: 'error', message })
		}
	}

	const { getRootProps, getInputProps, open } = useDropzone({
		accept,
		multiple: false,
		disabled: disabled || isUploading,
		maxSize,
		noClick: params.noClick,
		noKeyboard: params.noKeyboard,
		onDragEnter() {
			if (!uploading.current) setInputStatus(FileDropzoneStatus.FILE_DRAGGING)
		},
		onDragLeave() {
			if (!uploading.current) setInputStatus(FileDropzoneStatus.IDLE)
		},
		async onDropAccepted(files) {
			if (uploading.current || disabled || !files[0]) return
			uploading.current = true
			setErrorMessage(null)
			setFileName(files[0].name)
			setUploadedBytes(0)
			setTotalBytes(files[0].size)
			setInputStatus(FileDropzoneStatus.FILE_UPLOADING)

			try {
				await uploadFile(files[0])
			} catch (error) {
				reportError(error instanceof Error && error.message ? error.message : t('uploadError'))
			} finally {
				uploading.current = false
				setInputStatus(FileDropzoneStatus.IDLE)
			}
		},
		onDropRejected(files) {
			if (uploading.current || disabled) return
			setInputStatus(FileDropzoneStatus.IDLE)
			const tooLarge = files.some((file) => file.errors.some((error) => error.code === 'file-too-large'))
			const message =
				tooLarge && maxSize
					? t('fileTooLarge', { maxSizeMb: Math.round(maxSize / 1024 / 1024) })
					: t('wrongFile', { formats: supportedFormatsStr })

			reportError(message)
		},
	})

	return { getRootProps, getInputProps, open, inputStatus, uploadedBytes, totalBytes, fileName, errorMessage }
}
