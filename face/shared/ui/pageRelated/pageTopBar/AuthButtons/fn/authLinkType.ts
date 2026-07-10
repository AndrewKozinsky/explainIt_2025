import { useUser } from '@/shared/api/auth/UserProvider'

export function useGetAuthLinkType(): 'login' | 'account' {
	const user = useUser()

	return user ? 'account' : 'login'
}
