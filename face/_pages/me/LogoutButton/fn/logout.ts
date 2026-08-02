'use client'

import { useMemo, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useLocale } from 'next-intl'
import { AuthService } from '@/entites/auth/AuthService'
import { AuthApi } from '@/entites/auth/repository/AuthApi'
import { useAsyncMutation } from '@/shared/utils/fetchData/useAsyncMutation'
import { pageUrls, localizePath } from '@/shared/utils/pageUrls'

export function useGetLogout() {
	const router = useRouter()
	const locale = useLocale()

	const service = useMemo(() => new AuthService(new AuthApi()), [])
	const { mutate: logout } = useAsyncMutation(() => service.logout())

	return useCallback(
		async function () {
			const result = await logout(undefined)
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
