import { useRef, useContext, useCallback } from 'react'
import { videosService, VideosService } from '@/entities/video/VideosService'
import FileDropzone from '@/shared/ui/formRelated/FileDropzone/FileDropzone'
import { NotificationContext } from '@/shared/ui/Notification/fn/context'
import { getVideoDurationSec } from '@/shared/utils/getVideoDurationSec'

type VideoDropzoneProps = {
	videoId: number
	isFileUploaded: boolean | null
	onFileUpdated: () => void
}

function VideoDropzone(props: VideoDropzoneProps) {
	const { videoId, isFileUploaded, onFileUpdated } = props

	const { notify } = useContext(NotificationContext)
	const fileDurationSecRef = useRef<number>(0)

	const onGetUploadUrl = useCallback(
		async function (file: File): Promise<string | null> {
			const fileMimeType = file.type
			const fileSizeMb = Math.ceil(file.size / 1024 / 1024)

			try {
				fileDurationSecRef.current = await getVideoDurationSec(file)
			} catch {
				notify({
					type: 'error',
					message: 'Не удалось определить длительность видео',
				})
				return null
			}

			const result = await videosService.requestVideoUploadUrl(
				videoId,
				file.name,
				fileMimeType,
				fileSizeMb,
				fileDurationSecRef.current,
			)

			if (result.error || result.errors || !result.data) {
				return null
			}

			// Pre-signed URL comes back as fileUrl from the update response
			return result.data.fileUrl
		},
		[videoId, notify],
	)

	const onUploadComplete = useCallback(
		async function (): Promise<void> {
			await videosService.confirmVideoUpload(videoId, fileDurationSecRef.current)
			onFileUpdated()
		},
		[videoId, onFileUpdated],
	)

	return (
		<FileDropzone
			label='Файл с фильмом'
			accept={VideosService.supportedVideoFormats.accept}
			supportedFormatsStr={VideosService.supportedVideoFormats.description}
			visible={isFileUploaded !== true}
			onGetUploadUrl={onGetUploadUrl}
			onUploadComplete={onUploadComplete}
		/>
	)
}

export default VideoDropzone
