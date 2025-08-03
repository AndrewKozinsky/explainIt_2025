import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { useAuth_Login_With_OAuth } from '../../../../graphql'

export function useAuthorizeUser(providerType: string) {
	const code = useSearchParams().get('code')!

	const [authorizeWithOAuth] = useAuth_Login_With_OAuth()

	useEffect(function () {
		authorizeWithOAuth({
			variables: {
				input: {
					providerType,
					code,
				},
			},
		})
	}, [])
}
