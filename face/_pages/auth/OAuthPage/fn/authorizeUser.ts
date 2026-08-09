import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { AuthService } from '@/entities/auth/AuthService'
import { AuthApi } from '@/entities/auth/repository/AuthApi'
import { useSetUser } from '@/shared/api/auth/UserProvider'
import { useAsyncMutation } from '@/shared/utils/fetchData/useAsyncMutation'

export function useAuthorizeUser(providerType: string) {
	const code = useSearchParams().get('code')!

	const setUser = useSetUser()

	const service = useMemo(() => new AuthService(new AuthApi()), [])
	const { mutate: authorizeWithOAuth } = useAsyncMutation((input: { providerType: string; code: string }) =>
		service.loginWithOAuth(input),
	)

	const [authorizationStatus, setAuthorizationStatus] = useState<'loading' | 'error' | 'success'>('loading')
	const [error, setError] = useState<null | string>(null)

	useEffect(
		function () {
			authorizeWithOAuth({ providerType, code }).then((result) => {
				if (result.error) {
					console.log(result.error)
					setError(result.error)
					setAuthorizationStatus('error')
					return
				}

				setUser(result.data as Parameters<typeof setUser>[0])
				setAuthorizationStatus('success')
			})
		},
		[authorizeWithOAuth, code, providerType, setUser],
	)

	return { authorizationStatus, error }
}
