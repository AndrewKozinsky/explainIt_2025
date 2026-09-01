import { useMediaStoreContext } from '@/entities/media/store/MediaStoreContext'
import ErrorMessage from '@/shared/ui/ErrorMessage/ErrorMessage'
import Button from '@/shared/ui/formRelated/buttons/Button/Button'
import './SentenceTranslationError.scss'

type SentenceTranslationErrorProps = {
	sentenceId: number
	error: null | string
}

function SentenceTranslationError(props: SentenceTranslationErrorProps) {
	const { sentenceId, error } = props
	const mediaStore = useMediaStoreContext()

	if (!error) {
		return null
	}

	function handleRetry() {
		mediaStore.getState().retrySentenceTranslation(sentenceId)
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
