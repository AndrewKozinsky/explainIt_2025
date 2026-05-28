import { useContext, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { NotificationContext } from 'ui/Notification/context'

export enum FileDropzoneStatus {
	IDLE,
	FILE_DRAGGING,
	FILE_SELECTED,
	FILE_UPLOADING,
}

export type UseFileDropzoneParams = {
	accept: Record<string, string[]>
	supportedFormatsStr: string
	onGetUploadUrl: (file: File) => Promise<string | null>
	onUploadComplete: () => Promise<void>
}

export function useFileDropzone(params: UseFileDropzoneParams) {
	const { accept, supportedFormatsStr, onGetUploadUrl, onUploadComplete } = params

	const { notify } = useContext(NotificationContext)

	const [inputStatus, setInputStatus] = useState<FileDropzoneStatus>(FileDropzoneStatus.IDLE)
	const [uploadedBytes, setUploadedBytes] = useState(0)
	const [totalBytes, setTotalBytes] = useState(0)
	const [fileName, setFileName] = useState('')

	const { getRootProps, getInputProps } = useDropzone({
		accept,
		multiple: false,
		onDragEnter() {
			setInputStatus(FileDropzoneStatus.FILE_DRAGGING)
		},
		async onDropAccepted(files) {
			setInputStatus(FileDropzoneStatus.FILE_SELECTED)

			const file = files[0]
			setFileName(file.name)

			try {
				const uploadUrl = await onGetUploadUrl(file)
				if (!uploadUrl) {
					notify({
						type: 'error',
						message: 'Не удалось получить ссылку для загрузки',
					})
					setInputStatus(FileDropzoneStatus.IDLE)
					return
				}

				setInputStatus(FileDropzoneStatus.FILE_UPLOADING)

				const xhr = new XMLHttpRequest()

				xhr.open('PUT', uploadUrl)
				xhr.setRequestHeader('Content-Type', file.type)

				xhr.upload.onprogress = (event) => {
					if (event.lengthComputable) {
						setUploadedBytes(event.loaded)
						setTotalBytes(event.total)
					}
				}

				xhr.onload = () => {
					if (xhr.status === 200) {
						onUploadComplete()
							.then(() => {
								setInputStatus(FileDropzoneStatus.IDLE)
							})
							.catch(() => {
								notify({
									type: 'error',
									message: 'Не удалось подтвердить загрузку файла',
								})
								setInputStatus(FileDropzoneStatus.IDLE)
							})
					} else {
						notify({
							type: 'error',
							message: 'Не удалось загрузить файл',
						})
						setInputStatus(FileDropzoneStatus.IDLE)
					}
				}

				xhr.onerror = () => {
					notify({
						type: 'error',
						message: 'Не удалось загрузить файл',
					})
					setInputStatus(FileDropzoneStatus.IDLE)
				}

				xhr.send(file)
			} catch {
				notify({
					type: 'error',
					message: 'Не удалось загрузить файл',
				})
				setInputStatus(FileDropzoneStatus.IDLE)
			}
		},
		onDropRejected: () => {
			notify({
				type: 'error',
				message: `Можно перетащить только файлы с расширением ${supportedFormatsStr}.`,
			})
		},
	})

	return {
		getRootProps,
		getInputProps,
		inputStatus,
		uploadedBytes,
		totalBytes,
		fileName,
	}
}
