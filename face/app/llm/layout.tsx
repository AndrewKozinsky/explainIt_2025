import LLMPageLayout from '@/_pages/llm/LLMPageLayout/LLMPageLayout'
import { ReactNode } from 'react'

type LayoutProps = {
	children: ReactNode
}

function Layout(props: LayoutProps) {
	const { children } = props

	return <LLMPageLayout>{children}</LLMPageLayout>
}

export default Layout
