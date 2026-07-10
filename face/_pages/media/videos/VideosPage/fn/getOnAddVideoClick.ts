import { useCallback, useContext, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { createMediaIdUrl, pageUrls } from 'utils/pageUrls'
import { useRouter } from '@/i18n/routing'
import type { CreateVideoDtoLanguageCode } from '@/shared/api/generated/models'
import {
	useVideoPrivateControllerCreateVideoPrivate,
	getVideoPrivateControllerGetUserVideosPrivateQueryKey,
} from '@/shared/api/generated/video-private/video-private'
import { NotificationContext } from '@/shared/ui/Notification/fn/context'
import { languages } from '@/utils/languages'

export function useGetAddVideoConfig() {
	const { notify } = useContext(NotificationContext)
	const router = useRouter()
	const queryClient = useQueryClient()

	const [loading, setLoading] = useState(false)
	const [errorMessage, setErrorMessage] = useState<null | string>(null)

	const createVideo = useVideoPrivateControllerCreateVideoPrivate()

	const onClick = useCallback(
		async function () {
			setLoading(true)

			let createdVideoId: string | number | null = null

			try {
				const response = await createVideo.mutateAsync({
					data: {
						name: null,
						originalContent: null,
						languageCode: languages.en.code as CreateVideoDtoLanguageCode,
					},
				})

				const videoId = (response as unknown as { id: number }).id
				if (!videoId) {
					setErrorMessage('Не удалось создать видео.')
					return
				}

				createdVideoId = videoId

				// Invalidate the user videos query so the list refreshes when the user comes back
				queryClient.invalidateQueries({
					queryKey: getVideoPrivateControllerGetUserVideosPrivateQueryKey(),
				})
			} catch (error) {
				notify({ type: 'error', message: 'Не удалось создать видео.' })
			} finally {
				setLoading(false)
			}

			if (createdVideoId) {
				// Open a page with the created video
				const videoIdInUrl = createMediaIdUrl(createdVideoId, 'private')
				router.push(pageUrls.videos.video(videoIdInUrl).path)
			}
		},
		[createVideo, notify, router, queryClient],
	)

	return {
		loading,
		errorMessage,
		onClick,
	}
}
