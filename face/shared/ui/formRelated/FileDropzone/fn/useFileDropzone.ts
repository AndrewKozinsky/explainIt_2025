import { useContext, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import { useDropzone } from 'react-dropzone'
import type { UploadProgressCallbacks } from '@/shared/api/uploadWithProgress'
import { NotificationContext } from '@/shared/ui/Notification/fn/context'
import { uploadBySignedUrl } from './uploadBySignedUrl'

export enum FileDropzoneStatus {
	IDLE,
	FILE_DRAGGING,
	FILE_SELECTED,
	FILE_UPLOADING,
	FILE_PROCESSING,
}

type FileUploadHandlers =
	| {
			onUploadFile: (file: File, uploadProgress: UploadProgressCallbacks) => Promise<void>
			onGetUploadUrl?: never
			onUploadComplete?: never
	  }
	| {
			onUploadFile?: never
			onGetUploadUrl: (file: File) => Promise<string | null>
			onUploadComplete: () => Promise<void>
	  }

export type UseFileDropzoneParams = FileUploadHandlers & {
	accept: Record<string, string[]>
	supportedFormatsStr?: string
	disabled?: boolean
	maxSize?: number
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
		inputStatus === FileDropzoneStatus.FILE_SELECTED ||
		inputStatus === FileDropzoneStatus.FILE_UPLOADING ||
		inputStatus === FileDropzoneStatus.FILE_PROCESSING

	function updateProgress(loaded: number, total: number) {
		setUploadedBytes(loaded)
		setTotalBytes(total)
	}

	async function uploadFile(file: File) {
		if (params.onUploadFile) {
			return params.onUploadFile(file, {
				onProgress: updateProgress,
				onTransferComplete: () => setInputStatus(FileDropzoneStatus.FILE_PROCESSING),
			})
		}

		const uploadUrl = await params.onGetUploadUrl(file)
		if (!uploadUrl) throw new Error(t('uploadUrlError'))

		await uploadBySignedUrl(uploadUrl, file, updateProgress).catch(function (cause) {
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
		noClick: true,
		noKeyboard: true,
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
			if (tooLarge && maxSize) {
				reportError(t('fileTooLarge', { maxSizeMb: Math.round(maxSize / 1024 / 1024) }))
				return
			}

			reportError(supportedFormatsStr ? t('wrongFile', { formats: supportedFormatsStr }) : t('unsupportedFile'))
		},
	})

	return { getRootProps, getInputProps, open, inputStatus, uploadedBytes, totalBytes, fileName, errorMessage }
}
