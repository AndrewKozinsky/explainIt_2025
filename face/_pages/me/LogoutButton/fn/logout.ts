'use client'

import { useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useLocale } from 'next-intl'
import { useAuthControllerLogout } from '@/shared/api/generated/auth/auth'
import { pageUrls, localizePath } from '@/utils/pageUrls'

export function useGetLogout() {
	const router = useRouter()
	const locale = useLocale()
	const { mutateAsync: logout } = useAuthControllerLogout()

	return useCallback(
		async function () {
			try {
				await logout()
				// No setUser(null) here — on the current page MePageLayout
				// would react and call redirect(), conflicting with router.push().
				// The new page will get user=null from the server.
				router.push(localizePath(locale, pageUrls.main.path))
			} catch (error: unknown) {
				console.error(error)
			}
		},
		[logout, router, locale],
	)
}
