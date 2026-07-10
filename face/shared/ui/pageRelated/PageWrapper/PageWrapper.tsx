import RuFooter from '@/shared/ui/pageRelated/RuFooter/RuFooter'
import Bar from '../pageTopBar/PageTopBar/Bar'
import './PageWrapper.scss'

type PageWrapperProps = {
	withTop?: boolean
	withBottom?: boolean
	// Содержимое страницы
	children: React.ReactNode
}

export function PageWrapper(props: PageWrapperProps) {
	const { withTop = false, withBottom = false, children } = props

	return (
		<div className='page-wrapper' data-testid='page-wrapper'>
			{withTop && (
				<header className='page-wrapper__top'>
					<Bar />
				</header>
			)}
			<div className='page-wrapper__middle'>{children}</div>
			{withBottom && <RuFooter />}
		</div>
	)
}
