import cn from 'classnames'
import './Spinner.scss'

type SpinnerProps = {
	size?: 'full' | 'extra-small' | 'small'
	color?: 'white' | 'black'
}

function Spinner(props: SpinnerProps) {
	const { size = 'full', color = 'black' } = props

	return (
		<span className={cn('lds-spinner', 'lds-spinner--' + size, 'lds-spinner--' + color)}>
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
