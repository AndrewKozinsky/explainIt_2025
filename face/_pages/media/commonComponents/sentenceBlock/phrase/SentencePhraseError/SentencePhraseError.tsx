import ErrorMessage from 'ui/ErrorMessage/ErrorMessage'
import Button from '@/ui/formRelated/buttons/Button/Button'
import { SentencePhraseType, useDetailsStore } from '_pages/media/detailsBlock/detailsStore'
import './SentencePhraseError.scss'

type SentencePhraseErrorProps = {
	phraseAnalysis: SentencePhraseType
	sentenceId: number
}

function SentencePhraseError(props: SentencePhraseErrorProps) {
	const { phraseAnalysis, sentenceId } = props

	if (!phraseAnalysis) {
		return null
	}

	if (!phraseAnalysis.error) {
		return null
	}

	function handleRetry() {
		useDetailsStore.getState().retryPhraseTranslation(sentenceId, phraseAnalysis.randomGeneratedPhraseId)
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
