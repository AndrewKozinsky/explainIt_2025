import { useCallback, useContext, useEffect, useState } from 'react'
import { getTextByUnknownError } from 'utils/extractErrorText'
import {
	SubtitlesGenerationStatus,
	useVideoPrivate_GenerateSubtitles,
	useVideoPrivate_GetSubtitlesGenerationStatus,
	VideoPrivate_GetDocument,
	VideoPrivate_GetUserVideosDocument,
} from '@/graphql'
import { NotificationContext } from '@/ui/Notification/context'
import { useVideoStore } from '_pages/media/video/videoStore'

export function useGenerateSubtitles() {
	const { notify } = useContext(NotificationContext)
	const video = useVideoStore((s) => s.privateVideo.data)
	const [isPolling, setIsPolling] = useState(false)

	const [generateSubtitles, { loading: generating }] = useVideoPrivate_GenerateSubtitles({
		refetchQueries: [VideoPrivate_GetUserVideosDocument],
	})

	const statusQuery = useVideoPrivate_GetSubtitlesGenerationStatus({
		variables: { input: { videoId: video?.id ?? 0 } },
		skip: !video,
		pollInterval: isPolling ? 1500 : 0,
	})

	const generationStatus = statusQuery.data?.video_private_get_subtitles_generation_status.status
	const generationError = statusQuery.data?.video_private_get_subtitles_generation_status.error
	const status = generationStatus ?? SubtitlesGenerationStatus.Idle
	const isGenerating =
		generating || status === SubtitlesGenerationStatus.Pending || status === SubtitlesGenerationStatus.Processing

	useEffect(
		function () {
			if (!video) return

			setIsPolling(
				status === SubtitlesGenerationStatus.Pending || status === SubtitlesGenerationStatus.Processing,
			)
		},
		[status, video],
	)

	useEffect(
		function () {
			if (!video || status !== SubtitlesGenerationStatus.Done) return

			void statusQuery.client.query({
				query: VideoPrivate_GetDocument,
				variables: { input: { id: video.id } },
				fetchPolicy: 'network-only',
			})
		},
		[status, statusQuery.client, video],
	)

	const generate = useCallback(
		async function () {
			if (!video) return

			try {
				const { errors } = await generateSubtitles({ variables: { input: { videoId: video.id } } })

				if (errors) {
					notify({
						type: 'error',
						message:
							'Не удалось запустить генерацию субтитров. Попробуйте ещё раз или сообщите о проблеме в форме обратной связи.',
					})
					return
				}

				setIsPolling(true)
				await statusQuery.refetch()
			} catch (err) {
				notify({
					type: 'error',
					message: getTextByUnknownError(err),
				})
			}
		},
		[generateSubtitles, notify, statusQuery, video],
	)

	return {
		status,
		generationError,
		isGenerating,
		generate,
	}
}
