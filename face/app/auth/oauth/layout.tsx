import { ReactNode } from 'react'

type LayoutProps = {
	children: ReactNode
}

function Layout(props: LayoutProps) {
	const { children } = props

	return children
}

export default Layout
