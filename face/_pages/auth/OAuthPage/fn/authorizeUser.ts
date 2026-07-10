import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { errorMessages } from 'utils/errorMessages'
import { useSetUser } from '@/shared/api/auth/UserProvider'
import { useAuthControllerLoginWithOAuth } from '@/shared/api/generated/auth/auth'
import type { UserOutModel, LoginWithOAuthDtoProviderType } from '@/shared/api/generated/models'
import { ApiError } from '@/shared/api/mutator'

export function useAuthorizeUser(providerType: LoginWithOAuthDtoProviderType) {
	const code = useSearchParams().get('code')!

	const { mutateAsync: authorizeWithOAuth } = useAuthControllerLoginWithOAuth()
	const setUser = useSetUser()

	const [authorizationStatus, setAuthorizationStatus] = useState<'loading' | 'error' | 'success'>('loading')
	const [error, setError] = useState<null | string>(null)

	useEffect(
		function () {
			authorizeWithOAuth({
				data: {
					providerType,
					code,
				},
			})
				.then((response) => {
					const user = response as unknown as UserOutModel
					setUser(user)
					setAuthorizationStatus('success')
				})
				.catch((error: unknown) => {
					console.log(error)
					if (
						error instanceof ApiError &&
						error.body &&
						typeof error.body === 'object' &&
						'message' in error.body
					) {
						setError((error.body as { message: string }).message)
					} else {
						setError(errorMessages.unknownErrorWhileAuth)
					}
					setAuthorizationStatus('error')
				})
		},
		[authorizeWithOAuth, code, providerType, setUser],
	)

	return { authorizationStatus, error }
}
