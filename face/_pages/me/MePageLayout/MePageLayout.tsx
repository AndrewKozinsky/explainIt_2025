'use client'

import { redirect } from 'next/navigation'
import LoadingMessage from 'ui/LoadingMessage/LoadingMessage'
import { useUserStore } from '@/stores/userStore'
import { pageUrls } from '@/сonsts/pageUrls'

type LLMPageLayoutProps = {
	children: React.ReactNode
}

function MePageLayout(props: LLMPageLayoutProps) {
	const { children } = props

	const user = useUserStore((state) => state.user)
	const isLoading = useUserStore((state) => state.isLoading)

	if (isLoading) {
		return <LoadingMessage text='Загрузка...' />
	}

	if (!user) {
		redirect(pageUrls.auth.login.path)
	}

	return children
}

export default MePageLayout
