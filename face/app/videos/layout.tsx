import { ReactNode } from 'react'
import VideosPageLayout from '_pages/video/VideosPageLayout/BooksPageLayout'

type LayoutProps = {
	children: ReactNode
}

function Layout(props: LayoutProps) {
	const { children } = props

	return <VideosPageLayout>{children}</VideosPageLayout>
}

export default Layout
