// import { useCallback, useContext, useEffect, useState } from 'react'
// import { useQueryClient } from '@tanstack/react-query'
// import {
// 	useVideoPrivateControllerGenerateSubtitles,
// 	useVideoPrivateControllerGetSubtitlesStatus,
// 	getVideoPrivateControllerGetUserVideosPrivateQueryKey,
// 	getVideoPrivateControllerGetVideoPrivateQueryKey,
// } from '@/shared/api/generated/video-private/video-private'
// import type { VideoPrivateSubtitlesStatusOutModel } from '@/shared/api/generated/models'
// import { VideoPrivateSubtitlesStatusOutModelStatus } from '@/shared/api/generated/models'
// import { NotificationContext } from '@/shared/ui/Notification/fn/context'
// import { useVideoStore } from '_pages/media/video/videoStore'

/*export function useGenerateSubtitles() {
	const { notify } = useContext(NotificationContext)
	const video = useVideoStore((s) => s.privateVideo.data)
	const [isPolling, setIsPolling] = useState(false)
	const queryClient = useQueryClient()

	const { mutateAsync: generateSubtitles, isPending: generating } = useVideoPrivateControllerGenerateSubtitles()

	const { data: statusData, refetch: refetchStatus } = useVideoPrivateControllerGetSubtitlesStatus(
		video?.id ?? 0,
		{
			query: { enabled: !!video, refetchInterval: isPolling ? 1500 : false },
		},
	)

	const statusModel = statusData as unknown as VideoPrivateSubtitlesStatusOutModel | undefined
	const generationStatus = statusModel?.status
	const generationError = statusModel?.error
	const status = generationStatus ?? VideoPrivateSubtitlesStatusOutModelStatus.idle
	const isGenerating =
		generating ||
		status === VideoPrivateSubtitlesStatusOutModelStatus.pending ||
		status === VideoPrivateSubtitlesStatusOutModelStatus.processing

	useEffect(
		function () {
			if (!video) return

			setIsPolling(
				status === VideoPrivateSubtitlesStatusOutModelStatus.pending ||
					status === VideoPrivateSubtitlesStatusOutModelStatus.processing,
			)
		},
		[status, video],
	)

	useEffect(
		function () {
			if (!video || status !== VideoPrivateSubtitlesStatusOutModelStatus.done) return

			queryClient.invalidateQueries({ queryKey: getVideoPrivateControllerGetVideoPrivateQueryKey(video.id) })
		},
		[status, queryClient, video],
	)

	const generate = useCallback(
		async function () {
			if (!video) return

			try {
				await generateSubtitles({ id: video.id })

				queryClient.invalidateQueries({ queryKey: getVideoPrivateControllerGetUserVideosPrivateQueryKey() })

				setIsPolling(true)
				await refetchStatus()
			} catch {
				notify({
					type: 'error',
					message:
						'Не удалось запустить генерацию субтитров. Попробуйте ещё раз или сообщите о проблеме в форме обратной связи.',
				})
			}
		},
		[generateSubtitles, notify, queryClient, refetchStatus, video],
	)

	return {
		status,
		generationError,
		isGenerating,
		generate,
	}
}*/
