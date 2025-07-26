import { ReactNode } from 'react'
import MePageLayout from '../../_pages/me/MePageLayout/MePageLayout'

type LayoutProps = {
	children: ReactNode
}

function Layout(props: LayoutProps) {
	const { children } = props

	return <MePageLayout>{children}</MePageLayout>
}

export default Layout
