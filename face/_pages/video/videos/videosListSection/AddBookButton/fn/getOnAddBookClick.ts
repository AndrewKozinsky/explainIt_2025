import { useCallback, useContext, useState } from 'react'
import { redirect } from 'next/navigation'
import { useVideoPrivate_Create, VideoPrivate_GetUserVideosDocument } from '@/graphql'
import { NotificationContext } from '@/ui/Notification/context'
import { createVideoIdUrl, pageUrls } from 'сonsts/pageUrls'

export function useGetOnAddVideoClick() {
	const { notify } = useContext(NotificationContext)

	const [status, setStatus] = useState<'idle' | 'loading'>('idle')
	const [createVideo] = useVideoPrivate_Create({
		refetchQueries: [VideoPrivate_GetUserVideosDocument],
		awaitRefetchQueries: true,
	})

	const onAddVideoClick = useCallback(
		async function () {
			setStatus('loading')

			let createdVideoId: string | number | null = null

			try {
				const { errors, data } = await createVideo({
					variables: { input: { name: null, originalContent: null } },
				})

				if (errors) {
					throw new Error('Не удалось создать книгу.')
				}

				const videoId = data?.video_private_create.id
				if (!videoId) {
					throw new Error('Не удалось создать книгу.')
				}

				createdVideoId = videoId
			} catch (error) {
				notify({ type: 'error', message: 'Не удалось получить список видео.' })
			} finally {
				setStatus('idle')
			}

			if (createdVideoId) {
				// Open a page with the created video
				const videoIdInUrl = createVideoIdUrl(createdVideoId, 'private')
				redirect(pageUrls.videos.video(videoIdInUrl).path)
			}
		},
		[createVideo, notify],
	)

	return {
		status,
		onAddBookClick: onAddVideoClick,
	}
}
