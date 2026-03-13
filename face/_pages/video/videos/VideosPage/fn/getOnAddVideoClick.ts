import { useCallback, useContext, useState } from 'react'
import { redirect } from 'next/navigation'
import { useVideoPrivate_Create, VideoPrivate_GetUserVideosDocument } from '@/graphql'
import { NotificationContext } from '@/ui/Notification/context'
import { createMediaIdUrl, pageUrls } from 'сonsts/pageUrls'

export function useGetAddVideoConfig() {
	const { notify } = useContext(NotificationContext)

	const [loading, setLoading] = useState(false)
	const [errorMessage, setErrorMessage] = useState<null | string>(null)

	const [createVideo] = useVideoPrivate_Create({
		refetchQueries: [VideoPrivate_GetUserVideosDocument],
		awaitRefetchQueries: true,
	})

	const onClick = useCallback(
		async function () {
			setLoading(true)

			let createdVideoId: string | number | null = null

			try {
				const { errors, data } = await createVideo({
					variables: { input: { name: null, originalContent: null } },
				})

				if (errors) {
					setErrorMessage('Не удалось создать книгу.')
					return
				}

				const videoId = data?.video_private_create.id
				if (!videoId) {
					setErrorMessage('Не удалось создать книгу.')
					return
				}

				createdVideoId = videoId
			} catch (error) {
				notify({ type: 'error', message: 'Не удалось получить список видео.' })
			} finally {
				setLoading(false)
			}

			if (createdVideoId) {
				// Open a page with the created video
				const videoIdInUrl = createMediaIdUrl(createdVideoId, 'private')
				redirect(pageUrls.videos.video(videoIdInUrl).path)
			}
		},
		[createVideo, notify],
	)

	return {
		loading,
		errorMessage,
		onClick,
	}
}
