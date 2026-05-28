// import { useContext, useRef } from 'react'
// import { NotificationContext } from 'ui/Notification/context'
// import { useVideoPrivate_Update, VideoPrivate_GetDocument, VideoPrivate_GetUserVideosDocument } from '@/graphql'
// import FileDropzone from '@/ui/formRelated/FileDropzone/FileDropzone'
// import { useVideoStore } from '_pages/media/video/videoStore'
// import { getVideoDurationSec } from './fn/getVideoDurationSec'

// const supportedVideoFormatsStr = 'MP4, WebM, OGG'

/*function VideoDropzone() {
	const video = useVideoStore((s) => s.privateVideo.data)

	const { notify } = useContext(NotificationContext)
	const fileDurationSecRef = useRef<number>(0)

	const [updateVideo] = useVideoPrivate_Update({
		refetchQueries: [
			VideoPrivate_GetUserVideosDocument,
			{ query: VideoPrivate_GetDocument, variables: { input: { id: video?.id } } },
		],
	})

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
			variables: {
				input: {
					id: video.id,
					fileMimeType,
					fileName: file.name,
					fileSizeMb,
					fileDurationSec: fileDurationSecRef.current,
					languageCode: video.languageCode,
				},
			},
		})

		return res.data?.video_private_update.uploadUrl ?? null
	}

	const onUploadComplete = async (): Promise<void> => {
		if (!video) return

		await updateVideo({
			variables: {
				input: {
					id: video.id,
					isFileUploaded: true,
					languageCode: video.languageCode,
					fileDurationSec: fileDurationSecRef.current,
				},
			},
		})
	}

	return (
		<FileDropzone
			accept={{ 'video/mp4': ['.mp4'], 'video/webm': ['.webm'], 'video/ogg': ['.ogg'] }}
			supportedFormatsStr={supportedVideoFormatsStr}
			idleText='Перетащите видео сюда'
			visible={!!(video && !video.isFileUploaded)}
			onGetUploadUrl={onGetUploadUrl}
			onUploadComplete={onUploadComplete}
		/>
	)
}*/

// export default VideoDropzone
