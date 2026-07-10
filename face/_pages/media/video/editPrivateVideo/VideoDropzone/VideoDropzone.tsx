import { useContext, useRef } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import {
	useVideoPrivateControllerUpdateVideoPrivate,
	getVideoPrivateControllerGetUserVideosPrivateQueryKey,
	getVideoPrivateControllerGetVideoPrivateQueryKey,
} from '@/shared/api/generated/video-private/video-private'
import type { UpdateVideoDtoLanguageCode, UpdateVideoPrivateOutModel } from '@/shared/api/generated/models'
import FileDropzone from '@/shared/ui/formRelated/FileDropzone/FileDropzone'
import { NotificationContext } from '@/shared/ui/Notification/fn/context'
import { useVideoStore } from '_pages/media/video/videoStore'
import { getVideoDurationSec } from './fn/getVideoDurationSec'

const supportedVideoFormatsStr = 'MP4, WebM, OGG'

function VideoDropzone() {
	const video = useVideoStore((s) => s.privateVideo.data)

	const { notify } = useContext(NotificationContext)
	const fileDurationSecRef = useRef<number>(0)

	const { mutateAsync: updateVideo } = useVideoPrivateControllerUpdateVideoPrivate()
	const queryClient = useQueryClient()

	const onGetUploadUrl = async (file: File): Promise<string | null> => {
		if (!video) return null

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

		const res = await updateVideo({
			id: video.id,
			data: {
				fileMimeType,
				fileName: file.name,
				fileSizeMb,
				fileDurationSec: fileDurationSecRef.current,
				languageCode: video.languageCode as unknown as UpdateVideoDtoLanguageCode,
			},
		})

		const updatedVideo = res as unknown as UpdateVideoPrivateOutModel
		return (updatedVideo.uploadUrl as unknown as string) ?? null
	}

	const onUploadComplete = async (): Promise<void> => {
		if (!video) return

		await updateVideo({
			id: video.id,
			data: {
				isFileUploaded: true,
				languageCode: video.languageCode as unknown as UpdateVideoDtoLanguageCode,
				fileDurationSec: fileDurationSecRef.current,
			},
		})

		queryClient.invalidateQueries({ queryKey: getVideoPrivateControllerGetUserVideosPrivateQueryKey() })
		queryClient.invalidateQueries({ queryKey: getVideoPrivateControllerGetVideoPrivateQueryKey(video.id) })
	}

	return (
		<FileDropzone
			label='Файл с фильмом'
			accept={{ 'video/mp4': ['.mp4'], 'video/webm': ['.webm'], 'video/ogg': ['.ogg'] }}
			supportedFormatsStr={supportedVideoFormatsStr}
			visible={video && !video.isFileUploaded}
			onGetUploadUrl={onGetUploadUrl}
			onUploadComplete={onUploadComplete}
		/>
	)
}

export default VideoDropzone
