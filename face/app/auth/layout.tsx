import { ReactNode } from 'react'
import AuthMainPageLayout from '../../_pages/auth/main/AuthMainPageLayout/AuthMainPageLayout'

type LayoutProps = {
	children: ReactNode
}

function Layout(props: LayoutProps) {
	const { children } = props

	return <AuthMainPageLayout>{children}</AuthMainPageLayout>
}

export default Layout
