import { ReactNode } from 'react'
import VideosPageLayout from '_pages/media/VideosPageLayout/VideosPageLayout'

type LayoutProps = {
	children: ReactNode
}

function Layout(props: LayoutProps) {
	const { children } = props

	return <VideosPageLayout>{children}</VideosPageLayout>
}

export default Layout
