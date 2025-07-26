import { useMemo } from 'react'
import { useUserStore } from '../../../../../stores/userStore'

export function useGetAuthLinkType(): 'login' | 'account' {
	const user = useUserStore((state) => state.user)
	const isLoading = useUserStore((state) => state.isLoading)

	return useMemo(
		function () {
			if (isLoading) {
				return 'login'
			}

			if (user) return 'account'
			return 'login'
		},
		[user, isLoading],
	)
}
