import type { SentencePhraseType } from '@/entities/media/store/translationTypes'
import { useMediaStoreContext } from '@/entities/media/store/MediaStoreContext'
import ErrorMessage from '@/shared/ui/ErrorMessage/ErrorMessage'
import Button from '@/shared/ui/formRelated/buttons/Button/Button'
import './SentencePhraseError.scss'

type SentencePhraseErrorProps = {
	phraseAnalysis: SentencePhraseType
	sentenceId: number
}

function SentencePhraseError(props: SentencePhraseErrorProps) {
	const { phraseAnalysis, sentenceId } = props
	const mediaStore = useMediaStoreContext()

	if (!phraseAnalysis) {
		return null
	}

	if (!phraseAnalysis.error) {
		return null
	}

	function handleRetry() {
		mediaStore.getState().retryPhraseTranslation(sentenceId, phraseAnalysis.randomGeneratedPhraseId)
	}

	return (
		<div className='sentence-phrase-error'>
			<div className='sentence-phrase-error__message'>
				<ErrorMessage text={phraseAnalysis.error} />
			</div>
			<Button type='button' size='small' theme='outline' onClick={handleRetry}>
				Повторить
			</Button>
		</div>
	)
}

export default SentencePhraseError
