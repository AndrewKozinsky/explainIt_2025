'use client'

import { useCallback } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useLocale } from 'next-intl'
import { authQueries } from '@/entities/auth/AuthQueryFacade'
import { useSetUser } from '@/shared/api/auth/UserProvider'
import { pageUrls, localizePath } from '@/shared/utils/pageUrls'

export function useGetLogout() {
	const router = useRouter()
	const locale = useLocale()
	const setUser = useSetUser()

	const { mutateAsync: logout } = useMutation(authQueries.logout())

	return useCallback(
		async function () {
			const result = await logout()
			if (result.error) {
				console.error(result.error)
				return
			}

			setUser(null)
			router.push(localizePath(locale, pageUrls.main.path))
		},
		[logout, router, locale, setUser],
	)
}
