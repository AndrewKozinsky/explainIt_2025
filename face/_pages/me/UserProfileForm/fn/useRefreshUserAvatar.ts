import { useEffect, useRef } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { userQueries } from '@/entities/user/UserQueryFacade'
import type { UserModel } from '@/entities/user/UserService'
import { useSetUser } from '@/shared/api/auth/UserProvider'

/** Обновляет подписанную ссылку и контекст после её безопасного срока, в том числе после сна вкладки. */
export function useRefreshUserAvatar(user: UserModel, isSaving: boolean) {
	const queryClient = useQueryClient()
	const setUser = useSetUser()
	const lastAttempt = useRef(0)

	useEffect(
		function () {
			if (isSaving) return
			const expiresAt = Date.parse(user.avatarUrlExpiresAt)
			if (!Number.isFinite(expiresAt)) return
			let stopped = false
			let refreshing = false
			let timer: ReturnType<typeof setTimeout>

			async function refresh() {
				if (stopped || refreshing) return
				if (document.hidden) {
					timer = setTimeout(refresh, 60_000)
					return
				}
				const retryDelay = lastAttempt.current + 60_000 - Date.now()
				if (retryDelay > 0) {
					timer = setTimeout(refresh, retryDelay)
					return
				}
				lastAttempt.current = Date.now()
				refreshing = true

				try {
					const refreshed = await queryClient.fetchQuery({ ...userQueries.getMe(), staleTime: 0 })
					if (!stopped) setUser(refreshed)
				} catch {
					if (!stopped) timer = setTimeout(refresh, 60_000)
				} finally {
					refreshing = false
				}
			}

			function onVisibilityChange() {
				if (!document.hidden && Date.now() >= expiresAt) {
					clearTimeout(timer)
					void refresh()
				}
			}

			timer = setTimeout(refresh, Math.max(0, expiresAt - Date.now()))
			document.addEventListener('visibilitychange', onVisibilityChange)

			return function () {
				stopped = true
				clearTimeout(timer)
				document.removeEventListener('visibilitychange', onVisibilityChange)
			}
		},
		[user.avatarUrlExpiresAt, user.id, isSaving, queryClient, setUser],
	)
}
