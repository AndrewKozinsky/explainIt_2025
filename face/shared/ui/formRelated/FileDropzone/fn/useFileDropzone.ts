import { useContext, useRef, useState } from 'react'
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
}

export function useFileDropzone(params: UseFileDropzoneParams) {
	const { accept, supportedFormatsStr, disabled, maxSize } = params
	const { notify } = useContext(NotificationContext)
	const uploading = useRef(false)
	const [inputStatus, setInputStatus] = useState(FileDropzoneStatus.IDLE)
	const [uploadedBytes, setUploadedBytes] = useState(0)
	const [totalBytes, setTotalBytes] = useState(0)
	const [fileName, setFileName] = useState('')
	const isUploading =
		inputStatus === FileDropzoneStatus.FILE_SELECTED || inputStatus === FileDropzoneStatus.FILE_UPLOADING

	async function uploadFile(file: File) {
		if (params.onUploadFile) return params.onUploadFile(file)
		const uploadUrl = await params.onGetUploadUrl(file)
		if (!uploadUrl) throw new Error('Не удалось получить ссылку для загрузки')
		await uploadBySignedUrl(uploadUrl, file, function (loaded, total) {
			setUploadedBytes(loaded)
			setTotalBytes(total)
		})
		await params.onUploadComplete()
	}

	const { getRootProps, getInputProps } = useDropzone({
		accept,
		multiple: false,
		disabled: disabled || isUploading,
		maxSize,
		onDragEnter() {
			if (!uploading.current) setInputStatus(FileDropzoneStatus.FILE_DRAGGING)
		},
		onDragLeave() {
			if (!uploading.current) setInputStatus(FileDropzoneStatus.IDLE)
		},
		async onDropAccepted(files) {
			if (uploading.current || disabled || !files[0]) return
			uploading.current = true
			setFileName(files[0].name)
			setUploadedBytes(0)
			setTotalBytes(files[0].size)
			setInputStatus(FileDropzoneStatus.FILE_UPLOADING)
			try {
				await uploadFile(files[0])
			} catch (error) {
				notify({ type: 'error', message: error instanceof Error ? error.message : 'Не удалось загрузить файл' })
			} finally {
				uploading.current = false
				setInputStatus(FileDropzoneStatus.IDLE)
			}
		},
		onDropRejected(files) {
			setInputStatus(FileDropzoneStatus.IDLE)
			const tooLarge = files.some((file) => file.errors.some((error) => error.code === 'file-too-large'))
			const message =
				tooLarge && maxSize
					? `Файл слишком большой. Максимальный размер — ${Math.round(maxSize / 1024 / 1024)} МБ.`
					: `Выберите один файл: ${supportedFormatsStr}.`
			notify({ type: 'error', message })
		},
	})

	return { getRootProps, getInputProps, inputStatus, uploadedBytes, totalBytes, fileName }
}
