import { useVideoPrivate_Create, VideoPrivate_GetUserVideosDocument } from '@/graphql'
import { useCallback, useContext, useState } from 'react'
import { NotificationContext } from '@/ui/Notification/context'
import { pageUrls } from 'сonsts/pageUrls'
import { redirect } from 'next/navigation'

export function useGetOnAddBookClick() {
	const { notify } = useContext(NotificationContext)

	const [status, setStatus] = useState<'idle' | 'loading'>('idle')
	const [createVideo] = useVideoPrivate_Create({
		refetchQueries: [VideoPrivate_GetUserVideosDocument],
		awaitRefetchQueries: true,
	})

	const onAddBookClick = useCallback(
		async function () {
			setStatus('loading')

			let createdBookId: string | number | null = null

			try {
				const { errors, data } = await createVideo({
					variables: { input: { name: null, text: null } },
				})

				if (errors) {
					throw new Error('Не удалось создать книгу.')
				}

				const videoId = data?.video_private_create.id
				if (!videoId) {
					throw new Error('Не удалось создать книгу.')
				}

				createdBookId = videoId
			} catch (error) {
				notify({ type: 'error', message: 'Не удалось получить список видео.' })
			} finally {
				setStatus('idle')
			}

			if (createdBookId) {
				// Open a page with created book
				redirect(pageUrls.videos.video(createdBookId).path)
			}
		},
		[createVideo, notify],
	)

	return {
		status,
		onAddBookClick,
	}
}
