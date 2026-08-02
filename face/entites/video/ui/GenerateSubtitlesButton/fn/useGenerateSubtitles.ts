import { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { VideosApi } from '@/entites/videos/repository/VideosApi'
import { VideosService } from '@/entites/videos/VideosService'
import { NotificationContext } from '@/shared/ui/Notification/fn/context'

export function useGenerateSubtitles(videoId: number) {
	const { notify } = useContext(NotificationContext)
	const [isPolling, setIsPolling] = useState(false)
	const [status, setStatus] = useState<string | null>(null)
	const [generationError, setGenerationError] = useState<string | null>(null)
	const [isGenerating, setIsGenerating] = useState(false)

	const videosService = useMemo(() => new VideosService(new VideosApi()), [])

	// Poll subtitles status
	useEffect(
		function () {
			if (!isPolling || !videoId) return

			const interval = setInterval(async () => {
				const result = await videosService.getSubtitlesStatus(videoId)

				if (result.data) {
					setStatus(result.data.status)

					const newStatus = result.data.status
					if (newStatus === 'done' || newStatus === 'failed') {
						setIsPolling(false)
						setIsGenerating(false)
					}

					if (newStatus === 'failed') {
						setGenerationError(result.data.errorCode)
					}
				}
			}, 1500)

			return function () {
				clearInterval(interval)
			}
		},
		[isPolling, videoId, videosService],
	)

	const generate = useCallback(
		async function () {
			if (!videoId) return

			try {
				setIsGenerating(true)
				const result = await videosService.generateSubtitles(videoId)

				if (result.error || result.errors) {
					notify({
						type: 'error',
						message:
							'Не удалось запустить генерацию субтитров. Попробуйте ещё раз или сообщите о проблеме в форме обратной связи.',
					})
					setIsGenerating(false)
					return
				}

				if (result.data) {
					setStatus(result.data.status)
					setIsPolling(true)
				}
			} catch {
				notify({
					type: 'error',
					message:
						'Не удалось запустить генерацию субтитров. Попробуйте ещё раз или сообщите о проблеме в форме обратной связи.',
				})
				setIsGenerating(false)
			}
		},
		[videoId, videosService, notify],
	)

	return {
		status,
		generationError,
		isGenerating,
		generate,
	}
}
