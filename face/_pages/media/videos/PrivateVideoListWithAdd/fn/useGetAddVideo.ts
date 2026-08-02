'use client'

import { useCallback, useContext, useMemo } from 'react'
import { redirect } from 'next/navigation'
import { useLocale } from 'next-intl'
import { VideosApi } from '@/entites/videos/repository/VideosApi'
import type { VideoLiteModel } from '@/entites/videos/repository/VideosRepository'
import { VideosService } from '@/entites/videos/VideosService'
import { useRouter } from '@/i18n/routing'
import { useUser } from '@/shared/api/auth/UserProvider'
import { NotificationContext } from '@/shared/ui/Notification/fn/context'
import type { ApiResult } from '@/shared/utils/fetchData/executeApiCall'
import { pageUrls, localizePath } from '@/shared/utils/pageUrls'

/**
 * Хук для создания нового приватного видео.
 *
 * Возвращает асинхронную функцию-обработчик, которая:
 * 1. Проверяет авторизацию (редирект на логин если не залогинен)
 * 2. Вызывает {@link VideosService.createVideo}
 * 3. Показывает уведомление при ошибке
 * 4. Редиректит на страницу видео при успехе
 *
 * @returns `() => Promise<ApiResult<VideoLiteModel>>` — обработчик для {@link MediaGridAddButton}
 */
export function useGetAddVideo(): () => Promise<ApiResult<VideoLiteModel>> {
	const router = useRouter()
	const { notify } = useContext(NotificationContext)
	const user = useUser()
	const locale = useLocale()

	const videosService = useMemo(() => new VideosService(new VideosApi()), [])

	const handleAdd = useCallback(
		async function (): Promise<ApiResult<VideoLiteModel>> {
			if (!user) {
				redirect(localizePath(locale, pageUrls.auth.login.path))
			}

			const result = await videosService.createVideo({
				name: null,
				originalContent: null,
				fileSizeMb: null,
				fileDurationSec: null,
				languageCode: 'en',
			})

			if (result.error) {
				notify({ type: 'error', message: result.error })
				return result
			}

			if (result.errors && result.errors.length > 0) {
				const text = result.errors
					.map(function (e) {
						return e.field + ': ' + e.messages.join(', ')
					})
					.join('; ')
				notify({ type: 'error', message: text })
				return result
			}

			if (result.data) {
				router.push(pageUrls.videos.video(result.data.id).path)
			}

			return result
		},
		[videosService, user, locale, notify, router],
	)

	return handleAdd
}
