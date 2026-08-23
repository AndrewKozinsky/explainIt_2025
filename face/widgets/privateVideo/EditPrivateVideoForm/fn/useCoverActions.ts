import { useCallback } from 'react'
import type { VideoLiteModel } from '@/entities/video/repository/VideosRepository'
import { videosService } from '@/entities/video/VideosService'

/**
 * Адаптер действий над обложкой для формы видео.
 * Сводит API видео к колбэкам общего компонента MediaCoverField.
 */
export function useCoverActions(videoId: number, onCoverUpdated: (video: VideoLiteModel) => void) {
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
		[videoId, onCoverUpdated],
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
		[videoId, onCoverUpdated],
	)

	const onDeleteCover = useCallback(
		async function (): Promise<void> {
			const result = await videosService.updateVideo(videoId, {
				coverFileName: null,
			})

			if (result.data) {
				onCoverUpdated(result.data)
			}
		},
		[videoId, onCoverUpdated],
	)

	return { onGetUploadUrl, onUploadComplete, onDeleteCover }
}
