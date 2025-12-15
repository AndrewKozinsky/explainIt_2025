import { useCallback } from 'react'
import { useAuth_Logout } from '@/graphql'
import { useUserStore } from 'stores/userStore'

export function useGetLogout() {
	const [logout] = useAuth_Logout()

	return useCallback(
		async function () {
			logout()
				.then(() => {
					useUserStore.getState().setUser(null)
				})
				.catch((error: unknown) => {
					console.error(error)
				})
		},
		[logout],
	)
}
