'use client'

import { redirect } from 'next/navigation'
import { useLocale } from 'next-intl'
import { useUser } from '@/shared/api/auth/UserProvider'
import { pageUrls, localizePath } from '@/shared/utils/pageUrls'

type LLMPageLayoutProps = {
	children: React.ReactNode
}

function MePageLayout(props: LLMPageLayoutProps) {
	const { children } = props

	const user = useUser()
	const locale = useLocale()

	if (!user) {
		redirect(localizePath(locale, pageUrls.auth.login.path))
	}

	return children
}

export default MePageLayout
