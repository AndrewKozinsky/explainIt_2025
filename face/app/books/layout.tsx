import BooksPageLayout from '../../_pages/books/BooksPageLayout/BooksPageLayout'
import { ReactNode } from 'react'

type LayoutProps = {
	children: ReactNode
}

function Layout(props: LayoutProps) {
	const { children } = props

	return <BooksPageLayout>{children}</BooksPageLayout>
}

export default Layout
