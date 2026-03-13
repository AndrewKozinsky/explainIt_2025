import { useContext, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { NotificationContext } from 'ui/Notification/context'
import { useVideoPrivate_Update, VideoPrivate_GetUserVideosDocument } from '@/graphql'
import { useVideoStore } from '_pages/video/video/videoStore'
import ContentFileDragging from './ContentFileDragging'
import ContentFileSelected from './ContentFileSelected'
import ContentFileUploading from './ContentFileUploading'
import ContentIdle from './ContentIdle'
import './VideoDropzone.scss'

enum VideoDropzoneStatus {
	IDLE,
	FILE_DRAGGING,
	FILE_SELECTED,
	FILE_UPLOADING,
}

const supportedVideoFormatsStr = 'MP4, WebM, OGG'

function VideoDropzone() {
	const video = useVideoStore.getState().privateVideo.data

	const { notify } = useContext(NotificationContext)

	const [inputStatus, setInputStatus] = useState<VideoDropzoneStatus>(VideoDropzoneStatus.IDLE)
	const [uploadedBytes, setUploadedBytes] = useState(0)
	const [totalBytes, setTotalBytes] = useState(0)
	const [fileName, setFileName] = useState('')

	const [updateVideo] = useVideoPrivate_Update({ refetchQueries: [VideoPrivate_GetUserVideosDocument] })

	const { getRootProps, getInputProps } = useDropzone({
		accept: { 'video/mp4': ['.mp4'], 'video/webm': ['.webm'], 'video/ogg': ['.ogg'] },
		multiple: false,
		onDragEnter() {
			setInputStatus(VideoDropzoneStatus.FILE_DRAGGING)
		},
		onDropAccepted(files) {
			setInputStatus(VideoDropzoneStatus.FILE_SELECTED)

			const file = files[0]
			const fileName = file.name
			setFileName(fileName)
			const fileMimeType = file.type

			const fileSizeMb = Math.ceil(file.size / 1024 / 1024) // 896945634 / 1024 / 1024

			updateVideo({
				variables: {
					input: { id: video!.id, fileMimeType, fileName, fileSizeMb },
				},
			}).then((res) => {
				if (!res.data) {
					console.log('error')
					return
				}

				const uploadUrl = res.data.video_private_update.uploadUrl
				if (!uploadUrl) {
					notify({
						type: 'error',
						message: 'Не удалось получить ссылку для загрузки',
					})
					return
				}

				setInputStatus(VideoDropzoneStatus.FILE_UPLOADING)

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
						updateVideo({
							variables: {
								input: { id: video!.id, isFileUploaded: true },
							},
						})
							.then((data) => {
								setInputStatus(VideoDropzoneStatus.IDLE)
							})
							.catch((err: unknown) => {
								notify({
									type: 'error',
									message: 'Не удалось загрузить видео',
								})
								setInputStatus(VideoDropzoneStatus.IDLE)
							})
					} else {
						notify({
							type: 'error',
							message: 'Не удалось загрузить видео',
						})
						setInputStatus(VideoDropzoneStatus.IDLE)
					}
				}

				xhr.onerror = () => {
					notify({
						type: 'error',
						message: 'Не удалось загрузить видео',
					})
				}

				xhr.send(file)
			})
		},
		onDropRejected: () => {
			notify({
				type: 'error',
				message: `Можно перетащить только файлы с расширением ${supportedVideoFormatsStr}.`,
			})
		},
	})

	if (!video || video.isFileUploaded) {
		return null
	}

	return (
		<div {...getRootProps()} className='video-dropzone__wrapper'>
			<input {...getInputProps()} />
			{inputStatus === VideoDropzoneStatus.IDLE && <ContentIdle />}
			{inputStatus === VideoDropzoneStatus.FILE_DRAGGING && <ContentFileDragging />}
			{inputStatus === VideoDropzoneStatus.FILE_SELECTED && <ContentFileSelected />}
			{inputStatus === VideoDropzoneStatus.FILE_UPLOADING && (
				<ContentFileUploading uploadedBytes={uploadedBytes} totalBytes={totalBytes} fileName={fileName} />
			)}
		</div>
	)
}

export default VideoDropzone
