import { redirect } from 'next/navigation'
import { ReactNode } from 'react'
import { getCurrentUser } from '@/shared/api/auth/getCurrentUser'
import { localizePath, pageUrls } from '@/shared/utils/pageUrls'

type LayoutProps = {
	children: ReactNode
	params: Promise<{ locale: string }>
}

async function Layout(props: LayoutProps) {
	const { children, params } = props
	const [{ locale }, user] = await Promise.all([params, getCurrentUser()])

	if (!user) {
		redirect(localizePath(locale, pageUrls.auth.login.path))
	}

	return children
}

export default Layout
