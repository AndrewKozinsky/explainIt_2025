import { useContext, useEffect, useMemo } from 'react'
import { redirect } from 'next/navigation'
import { useLocale } from 'next-intl'
import { VideosApi } from '@/entites/videos/repository/VideosApi'
import type { CreateVideoInput, VideoLite } from '@/entites/videos/repository/VideosRepository'
import { useRouter } from '@/i18n/routing'
import { useUser } from '@/shared/api/auth/UserProvider'
import { useAsyncMutation } from '@/shared/hooks/useAsyncMutation'
import { NotificationContext } from '@/shared/ui/Notification/fn/context'
import { pageUrls, localizePath } from '@/shared/utils/pageUrls'

export function useAddVideo() {
	const router = useRouter()
	const { notify } = useContext(NotificationContext)
	const user = useUser()
	const locale = useLocale()

	const api = useMemo(() => new VideosApi(), [])

	const { loading, error, mutate } = useAsyncMutation<CreateVideoInput, VideoLite>((input) => api.createVideo(input))

	useEffect(
		function () {
			if (error) {
				notify({ type: 'error', message: error })
			}
		},
		[error, notify],
	)

	const handleClick = async function () {
		if (!user) {
			redirect(localizePath(locale, pageUrls.auth.login.path))
			return
		}

		const video = await mutate({
			name: null,
			originalContent: null,
			fileSizeMb: null,
			fileDurationSec: null,
			languageCode: 'en',
		})

		if (video) {
			router.push(pageUrls.videos.video(video.id).path)
		}
	}

	return { handleClick, loading, error }
}
