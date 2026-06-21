import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useUserStore } from 'stores/userStore'
import { errorMessages } from 'utils/errorMessages'
import { getTextByUnknownError } from 'utils/extractErrorText'
import { useAuth_Login_With_OAuth } from '@/graphql'

export function useAuthorizeUser(providerType: string) {
	const code = useSearchParams().get('code')!

	const [authorizeWithOAuth] = useAuth_Login_With_OAuth()

	const [authorizationStatus, setAuthorizationStatus] = useState<'loading' | 'error' | 'success'>('loading')
	const [error, setError] = useState<null | string>(null)

	useEffect(
		function () {
			authorizeWithOAuth({
				variables: {
					input: {
						providerType,
						code,
					},
				},
			})
				.then((data) => {
					const payload = data?.data?.auth_login_with_OAuth
					if (!payload) {
						setAuthorizationStatus('error')
						setError(errorMessages.unknownErrorWhileAuth)
						return
					}

					// Put user data in the User store
					useUserStore.setState({ user: payload })

					setAuthorizationStatus('success')
				})
				.catch((error) => {
					console.log(error)
					setError(getTextByUnknownError(error, errorMessages.unknownErrorWhileAuth))
					setAuthorizationStatus('error')
				})
		},
		[authorizeWithOAuth, code, providerType],
	)

	return { authorizationStatus, error }
}
