'use client'

import { useCallback } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useLocale } from 'next-intl'
import { authQueries } from '@/entities/auth/AuthQueryFacade'
import { pageUrls, localizePath } from '@/shared/utils/pageUrls'

export function useGetLogout() {
	const router = useRouter()
	const locale = useLocale()

	const { mutateAsync: logout } = useMutation(authQueries.logout())

	return useCallback(
		async function () {
			const result = await logout()
			if (result.error) {
				console.error(result.error)
				return
			}
			// No setUser(null) here — on the current page MePageLayout
			// would react and call redirect(), conflicting with router.push().
			// The new page will get user=null from the server.
			router.push(localizePath(locale, pageUrls.main.path))
		},
		[logout, router, locale],
	)
}
