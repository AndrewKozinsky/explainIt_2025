import cn from 'classnames'
import './Spinner.scss'

type SpinnerProps = {
	size?: 'full' | 'small'
}

function Spinner(props: SpinnerProps) {
	const { size = 'full' } = props

	return (
		<span className={cn('lds-spinner', 'lds-spinner--' + size)}>
			<span />
			<span />
			<span />
			<span />
			<span />
			<span />
			<span />
			<span />
			<span />
			<span />
			<span />
			<span />
		</span>
	)
}

export default Spinner
