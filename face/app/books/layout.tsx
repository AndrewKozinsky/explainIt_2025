import { ReactNode } from 'react'
import BooksPageLayout from '_pages/media/BooksPageLayout/BooksPageLayout'

type LayoutProps = {
	children: ReactNode
}

function Layout(props: LayoutProps) {
	const { children } = props

	return <BooksPageLayout>{children}</BooksPageLayout>
}

export default Layout
