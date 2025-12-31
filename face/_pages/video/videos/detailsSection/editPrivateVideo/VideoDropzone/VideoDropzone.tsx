import { useVideoPrivate_Update, VideoPrivate_GetUserVideosDocument } from '@/graphql'
import ContentFileUploaded from '_pages/video/videos/detailsSection/editPrivateVideo/VideoDropzone/ContentFileUploaded'
import ContentFileUploading from '_pages/video/videos/detailsSection/editPrivateVideo/VideoDropzone/ContentFileUploading'
import React, { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import ContentIdle from './ContentIdle'
import ContentError from './ContentError'
import ContentFileDragging from './ContentFileDragging'
import ContentFileSelected from './ContentFileSelected'
import './VideoDropzone.scss'

enum VideoDropzoneStatus {
	IDLE,
	FILE_DRAGGING,
	FILE_SELECTED,
	FILE_UPLOADING,
	FILE_UPLOADED,
	ERROR,
}

const supportedVideoFormatsStr = 'MP4, WebM, OGG'

type VideoDropzoneProps = {
	videoId: number
}

function VideoDropzone(props: VideoDropzoneProps) {
	const { videoId } = props

	const [inputStatus, setInputStatus] = useState<VideoDropzoneStatus>(VideoDropzoneStatus.IDLE)
	const [errorText, setErrorText] = useState('')
	const [uploadingPercentage, setUploadingPercentage] = useState(0)

	const [updateBook] = useVideoPrivate_Update({ refetchQueries: [VideoPrivate_GetUserVideosDocument] })

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
			const fileMimeType = file.type

			updateBook({
				variables: {
					input: { id: videoId, fileMimeType, fileName },
				},
			}).then((data) => {
				if (!data.data) {
					console.log('error')
					return
				}

				const uploadUrl = data.data.video_private_update.uploadUrl
				if (!uploadUrl) {
					setInputStatus(VideoDropzoneStatus.ERROR)
					setErrorText('Не удалось получить ссылку для загрузки')
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
						setInputStatus(VideoDropzoneStatus.FILE_UPLOADED)
					} else {
						setInputStatus(VideoDropzoneStatus.ERROR)
						setErrorText('Не удалось загрузить видео')
					}
				}

				xhr.onerror = () => {
					setInputStatus(VideoDropzoneStatus.ERROR)
					setErrorText('Не удалось загрузить видео')
				}

				xhr.send(file)
			})
		},
		onDropRejected: () => {
			setInputStatus(VideoDropzoneStatus.ERROR)
			setErrorText(`Можно перетащить только файлы с расширением ${supportedVideoFormatsStr}.`)

			setTimeout(() => {
				setInputStatus(VideoDropzoneStatus.IDLE)
				setErrorText('')
			}, 3000)
		},
	})

	return (
		<div {...getRootProps()} className='video-dropzone__wrapper'>
			<input {...getInputProps()} />
			{inputStatus === VideoDropzoneStatus.IDLE && <ContentIdle />}
			{inputStatus === VideoDropzoneStatus.FILE_DRAGGING && <ContentFileDragging />}
			{inputStatus === VideoDropzoneStatus.FILE_SELECTED && <ContentFileSelected />}
			{inputStatus === VideoDropzoneStatus.FILE_UPLOADING && (
				<ContentFileUploading percentage={uploadingPercentage} />
			)}
			{inputStatus === VideoDropzoneStatus.FILE_UPLOADED && <ContentFileUploaded />}
			{inputStatus === VideoDropzoneStatus.ERROR && <ContentError errorText={errorText} />}
		</div>
	)
}

export default VideoDropzone
