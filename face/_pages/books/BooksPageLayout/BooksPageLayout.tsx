'use client'

import { redirect } from 'next/navigation'
import React from 'react'
import { useUserStore } from '@/stores/userStore'
import { pageUrls } from '@/сonsts/pageUrls'
import LoadingMessage from '../../../ui/LoadingMessage/LoadingMessage'

type LLMPageLayoutProps = {
	children: React.ReactNode
}

function BooksPageLayout(props: LLMPageLayoutProps) {
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

export default BooksPageLayout
