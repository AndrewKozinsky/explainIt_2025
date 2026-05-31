import { ReactNode } from 'react'
import MediaPageLayout from '_pages/media/commonComponents/MediaPageLayout/MediaPageLayout'

type LayoutProps = {
	children: ReactNode
}

function Layout(props: LayoutProps) {
	const { children } = props

	return <MediaPageLayout>{children}</MediaPageLayout>
}

export default Layout
