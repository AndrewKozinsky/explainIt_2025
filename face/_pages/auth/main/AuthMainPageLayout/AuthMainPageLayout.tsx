import { PageWrapper } from '@/shared/ui/pageRelated/PageWrapper/PageWrapper'
import './AuthMainPageLayout.scss'

type AuthPageLayoutProps = {
	children: React.ReactNode
}

function AuthMainPageLayout(props: AuthPageLayoutProps) {
	const { children } = props

	return (
		<PageWrapper withTop>
			<div className='auth-main-page-layout__body'>{children}</div>
		</PageWrapper>
	)
}

export default AuthMainPageLayout
