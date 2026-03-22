import { ErrorIcon } from '../icons/ErrorIcon/ErrorIcon'
import './ErrorMessage.scss'

type LoadingMessageProps = {
	text: null | string
}

function ErrorMessage(props: LoadingMessageProps) {
	const { text } = props

	if (!text) {
		return null
	}

	return (
		<div className='error-message' data-testid='exercise-error-analysis-block'>
			<ErrorIcon extraClass='error-message__icon' />
			{text}
		</div>
	)
}

export default ErrorMessage
