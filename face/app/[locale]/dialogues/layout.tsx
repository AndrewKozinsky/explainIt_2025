import { ReactNode } from 'react'
import MediaPageLayout from '@/shared/ui/media/MediaPageLayout/MediaPageLayout'

type LayoutProps = {
	children: ReactNode
}

function Layout(props: LayoutProps) {
	const { children } = props

	return <MediaPageLayout>{children}</MediaPageLayout>
}

export default Layout
