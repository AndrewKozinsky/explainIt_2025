import React from 'react'
import VideoDropzone from '@/entites/video/ui/VideoDropzone/VideoDropzone'
import FileNameAndDeleteFileButton from '../../FileNameAndDeleteFileButton/FileNameAndDeleteFileButton'

type VideoFileSectionProps = {
	fileUrl: string | null
	isFileUploaded: boolean | null
	videoId: number
	onFileUpdated: () => void
}

function areEqual(prev: VideoFileSectionProps, next: VideoFileSectionProps) {
	return (
		prev.fileUrl === next.fileUrl &&
		prev.isFileUploaded === next.isFileUploaded &&
		prev.videoId === next.videoId &&
		prev.onFileUpdated === next.onFileUpdated
	)
}

const VideoFileSection = React.memo(function VideoFileSection(props: VideoFileSectionProps) {
	const { fileUrl, isFileUploaded, videoId, onFileUpdated } = props

	if (fileUrl && isFileUploaded) {
		return (
			<FileNameAndDeleteFileButton
				fileUrl={fileUrl}
				isFileUploaded={isFileUploaded}
				videoId={videoId}
				onFileDeleted={onFileUpdated}
			/>
		)
	}

	return <VideoDropzone videoId={videoId} isFileUploaded={isFileUploaded} onFileUpdated={onFileUpdated} />
}, areEqual)

export default VideoFileSection
