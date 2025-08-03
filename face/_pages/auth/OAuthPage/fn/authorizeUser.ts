import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useAuth_Login_With_OAuth } from '../../../../graphql'
import { useUserStore } from '../../../../stores/userStore'

export function useAuthorizeUser(providerType: string) {
	const code = useSearchParams().get('code')!

	const [authorizeWithOAuth] = useAuth_Login_With_OAuth()

	const [authorizationStatus, setAuthorizationStatus] = useState<'loading' | 'error' | 'success'>('loading')
	const [error, setError] = useState<null | string>(null)

	useEffect(function () {
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
					setError('Неизвестная ошибка при авторизации')
					return
				}

				// Put user data to the User store
				useUserStore.setState({ user: payload })

				setAuthorizationStatus('success')
			})
			.catch((error) => {
				console.log(error)
				setError(error.message)
				setAuthorizationStatus('error')
			})
	}, [])

	return { authorizationStatus, error }
}
