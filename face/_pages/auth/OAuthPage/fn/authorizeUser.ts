import { useEffect, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import { authQueries } from '@/entities/auth/AuthQueryFacade'
import { useSetUser } from '@/shared/api/auth/UserProvider'

export function useAuthorizeUser(providerType: string) {
	const code = useSearchParams().get('code')!

	const setUser = useSetUser()

	const { mutateAsync: authorizeWithOAuth } = useMutation(authQueries.loginWithOAuth())

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

				setUser(result.data)
				setAuthorizationStatus('success')
			})
		},
		[authorizeWithOAuth, code, providerType, setUser],
	)

	return { authorizationStatus, error }
}
