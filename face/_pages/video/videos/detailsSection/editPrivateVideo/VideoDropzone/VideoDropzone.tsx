import { useVideoPrivate_Update, VideoPrivate_GetUserVideosDocument } from '@/graphql'
import ContentFileUploaded from '_pages/video/videos/detailsSection/editPrivateVideo/VideoDropzone/ContentFileUploaded'
import ContentFileUploading from '_pages/video/videos/detailsSection/editPrivateVideo/VideoDropzone/ContentFileUploading'
import { useVideosStore } from '_pages/video/videos/videosStore'
import React, { useContext, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { NotificationContext } from 'ui/Notification/context'
import ContentIdle from './ContentIdle'
import ContentFileDragging from './ContentFileDragging'
import ContentFileSelected from './ContentFileSelected'
import './VideoDropzone.scss'

enum VideoDropzoneStatus {
	IDLE,
	FILE_DRAGGING,
	FILE_SELECTED,
	FILE_UPLOADING,
	FILE_UPLOADED,
}

const supportedVideoFormatsStr = 'MP4, WebM, OGG'

function VideoDropzone() {
	const video = useVideosStore.getState().privateVideo

	const { notify } = useContext(NotificationContext)

	const [inputStatus, setInputStatus] = useState<VideoDropzoneStatus>(
		video!.isFileUploaded ? VideoDropzoneStatus.FILE_UPLOADED : VideoDropzoneStatus.IDLE,
	)
	const [uploadingPercentage, setUploadingPercentage] = useState(0)
	const [fileName, setFileName] = useState(video?.fileUrl ? video.fileUrl : '')

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

			updateVideo({
				variables: {
					input: { id: video!.id, fileMimeType, fileName },
				},
			}).then((data) => {
				if (!data.data) {
					console.log('error')
					return
				}

				const uploadUrl = data.data.video_private_update.uploadUrl
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
						const percent = Math.round((event.loaded / event.total) * 100)
						setUploadingPercentage(percent)
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
								setInputStatus(VideoDropzoneStatus.FILE_UPLOADED)
							})
							.catch((err: unknown) => {
								notify({
									type: 'error',
									message: 'Не удалось загрузить видео',
								})
							})
					} else {
						notify({
							type: 'error',
							message: 'Не удалось загрузить видео',
						})
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

	if (inputStatus === VideoDropzoneStatus.FILE_UPLOADED) {
		return (
			<div className='video-dropzone__wrapper'>
				<ContentFileUploaded fileName={fileName} />
			</div>
		)
	}

	return (
		<div {...getRootProps()} className='video-dropzone__wrapper'>
			<input {...getInputProps()} />
			{inputStatus === VideoDropzoneStatus.IDLE && <ContentIdle />}
			{inputStatus === VideoDropzoneStatus.FILE_DRAGGING && <ContentFileDragging />}
			{inputStatus === VideoDropzoneStatus.FILE_SELECTED && <ContentFileSelected />}
			{inputStatus === VideoDropzoneStatus.FILE_UPLOADING && (
				<ContentFileUploading percentage={uploadingPercentage} />
			)}
		</div>
	)
}

export default VideoDropzone
