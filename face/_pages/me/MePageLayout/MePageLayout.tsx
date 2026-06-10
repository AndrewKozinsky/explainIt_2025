'use client'

import { redirect } from 'next/navigation'
import { useLocale } from 'next-intl'
import LoadingMessage from 'ui/LoadingMessage/LoadingMessage'
import { useUserStore } from '@/stores/userStore'
import { pageUrls, localizePath } from '@/utils/pageUrls'

type LLMPageLayoutProps = {
	children: React.ReactNode
}

function MePageLayout(props: LLMPageLayoutProps) {
	const { children } = props

	const user = useUserStore((state) => state.user)
	const isLoading = useUserStore((state) => state.isLoading)
	const locale = useLocale()

	if (isLoading) {
		return <LoadingMessage text='Загрузка...' />
	}

	if (!user) {
		redirect(localizePath(locale, pageUrls.auth.login.path))
	}

	return children
}

export default MePageLayout
