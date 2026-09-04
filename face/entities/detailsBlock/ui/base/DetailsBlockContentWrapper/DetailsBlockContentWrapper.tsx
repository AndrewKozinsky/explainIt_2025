import cn from 'classnames'
import './DetailsBlockContentWrapper.scss'

type DetailsBlockContentWrapperProps = {
	center?: boolean
	children: React.ReactNode
}

function DetailsBlockContentWrapper(props: DetailsBlockContentWrapperProps) {
	const { center, children } = props

	return (
		<div className={cn('details-block-wrapper', center && 'details-block-wrapper--center')}>
			<div className={cn(!center && 'details-block-wrapper__scroll')}>{children}</div>
		</div>
	)
}

export default DetailsBlockContentWrapper
