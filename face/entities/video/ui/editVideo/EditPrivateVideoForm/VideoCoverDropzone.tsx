import React from 'react'
import type { VideoLiteModel } from '@/entities/video/repository/VideosRepository'
import FileDropzone from '@/shared/ui/formRelated/FileDropzone/FileDropzone'
import { useCoverUpload } from './fn/useCoverUpload'

type VideoCoverDropzoneProps = {
	videoId: number
	isCoverFileUploaded: boolean | null
	onCoverUpdated: (video: VideoLiteModel) => void
}

/** Поддерживаемые форматы файлов обложки */
const supportedCoverFormats = {
	accept: {
		'image/jpeg': ['.jpg', '.jpeg'],
		'image/png': ['.png'],
		'image/webp': ['.webp'],
		'image/avif': ['.avif'],
	},
	description: 'JPG, JPEG, PNG, WebP, AVIF',
}

function VideoCoverDropzone(props: VideoCoverDropzoneProps) {
	const { videoId, isCoverFileUploaded, onCoverUpdated } = props

	const { onGetUploadUrl, onUploadComplete } = useCoverUpload(videoId, onCoverUpdated)

	return (
		<FileDropzone
			label='Обложка'
			accept={supportedCoverFormats.accept}
			supportedFormatsStr={supportedCoverFormats.description}
			visible={isCoverFileUploaded !== true}
			onGetUploadUrl={onGetUploadUrl}
			onUploadComplete={onUploadComplete}
		/>
	)
}

export default VideoCoverDropzone
