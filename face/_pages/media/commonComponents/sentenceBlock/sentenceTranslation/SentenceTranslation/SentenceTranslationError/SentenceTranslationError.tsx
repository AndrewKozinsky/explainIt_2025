import ErrorMessage from 'ui/ErrorMessage/ErrorMessage'
import Button from '@/ui/formRelated/buttons/Button/Button'
import { useDetailsStore } from '_pages/media/detailsBlock/detailsStore'
import './SentenceTranslationError.scss'

type SentenceTranslationErrorProps = {
	sentenceId: number
	error: null | string
}

function SentenceTranslationError(props: SentenceTranslationErrorProps) {
	const { sentenceId, error } = props

	if (!error) {
		return null
	}

	function handleRetry() {
		useDetailsStore.getState().retrySentenceTranslation(sentenceId)
	}

	return (
		<div className='sentence-translation-error'>
			<div className='sentence-translation-error__message'>
				<ErrorMessage text={error} />
			</div>
			<Button onClick={handleRetry} type='button' size='small' theme='plain'>
				Retry
			</Button>
		</div>
	)
}

export default SentenceTranslationError
