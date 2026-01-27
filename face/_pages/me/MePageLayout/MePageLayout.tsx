'use client'

import { redirect } from 'next/navigation'
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
		return <div>Loading...</div>
	}

	if (!user) {
		redirect(pageUrls.auth.login.path)
	}

	return children
}

export default MePageLayout
