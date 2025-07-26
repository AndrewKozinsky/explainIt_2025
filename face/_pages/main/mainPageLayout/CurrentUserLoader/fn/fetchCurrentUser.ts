import { useAuth_GetMe } from '@/graphql'
import { useUserStore } from '@/stores/userStore'
import { useEffect } from 'react'

export function useFetchCurrentUser() {
	const { data, loading, error } = useAuth_GetMe()

	useEffect(
		function () {
			if (loading) return

			if (error || !data) {
				useUserStore.getState().setUser(null)
				return
			}

			useUserStore.getState().setUser(data.auth_getMe)
		},
		[loading, data, error],
	)
}
