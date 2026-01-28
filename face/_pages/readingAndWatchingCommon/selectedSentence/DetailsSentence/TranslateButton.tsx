import ErrorMessage from 'ui/ErrorMessage/ErrorMessage'
import Button from 'ui/formRelated/buttons/Button/Button'
import { useTranslateSentence } from '_pages/readingAndWatchingCommon/selectedSentence/DetailsSentence/fn/translateSentence'

function TranslateButton() {
	const { onTranslateClick, loading, errorText } = useTranslateSentence()

	return (
		<>
			<Button onClick={onTranslateClick} loading={loading}>
				Перевести
			</Button>
			<ErrorMessage text={errorText ?? ''} />
		</>
	)
}

export default TranslateButton
