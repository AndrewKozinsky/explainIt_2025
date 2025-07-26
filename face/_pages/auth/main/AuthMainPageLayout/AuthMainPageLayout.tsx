import React from 'react'
import { PageWrapper } from '@/ui/pageRelated/PageWrapper/PageWrapper'
import './AuthMainPageLayout.scss'

type AuthPageLayoutProps = {
	children: React.ReactNode
}

function AuthMainPageLayout(props: AuthPageLayoutProps) {
	const { children } = props

	return (
		<PageWrapper top>
			<div className='auth-main-page-layout__body'>{children}</div>
		</PageWrapper>
	)
}

export default AuthMainPageLayout
