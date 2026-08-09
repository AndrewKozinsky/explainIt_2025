import { useCallback, useMemo } from 'react'
import { VideosApi } from '@/entities/video/repository/VideosApi'
import type { VideoLiteModel } from '@/entities/video/repository/VideosRepository'
import { VideosService } from '@/entities/video/VideosService'

export function useCoverUpload(videoId: number, onCoverUpdated: (video: VideoLiteModel) => void) {
	const videosService = useMemo(() => new VideosService(new VideosApi()), [])

	const onGetUploadUrl = useCallback(
		async function (file: File): Promise<string | null> {
			const result = await videosService.updateVideo(videoId, {
				coverFileName: file.name,
				coverFileMimeType: file.type,
			})

			if (result.error || result.errors || !result.data) {
				return null
			}

			onCoverUpdated(result.data)

			return result.data.uploadCoverUrl
		},
		[videoId, videosService, onCoverUpdated],
	)

	const onUploadComplete = useCallback(
		async function (): Promise<void> {
			const result = await videosService.updateVideo(videoId, {
				isCoverFileUploaded: true,
			})

			if (result.data) {
				onCoverUpdated(result.data)
			}
		},
		[videoId, videosService, onCoverUpdated],
	)

	return { onGetUploadUrl, onUploadComplete }
}
