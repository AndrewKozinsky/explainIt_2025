import BooksPage from '../../_pages/books/BooksPage/BooksPage'
import BooksPageLayout from '../../_pages/books/BooksPageLayout/BooksPageLayout'
import { ReactNode } from 'react'

type LayoutProps = {
	children: ReactNode
}

function Layout(props: LayoutProps) {
	const { children } = props

	return (
		<BooksPageLayout>
			<BooksPage />
		</BooksPageLayout>
	)
}

export default Layout
