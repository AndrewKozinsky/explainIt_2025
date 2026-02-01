import ErrorMessage from 'ui/ErrorMessage/ErrorMessage'
import Button from 'ui/formRelated/buttons/Button/Button'
import { useTranslateSentence } from '_pages/readingAndWatchingCommon/selectedSentence/DetailsSentence/fn/translateSentence'
import { useSelectedSentenceStore } from '_pages/readingAndWatchingCommon/selectedSentence/selectedSentenceStore'

function TranslateButton() {
	const { onTranslateClick, loading, errorText } = useTranslateSentence()

	const sentenceTranslations = useSelectedSentenceStore((s) => s.sentenceTranslations)
	const sentenceTranslationsLoading = useSelectedSentenceStore((s) => s.sentenceTranslationsLoading)
	const hasAnyTranslation = sentenceTranslations.length > 0

	return (
		<>
			{sentenceTranslationsLoading || hasAnyTranslation ? null : (
				<Button onClick={onTranslateClick} loading={loading}>
					Перевести
				</Button>
			)}
			<ErrorMessage text={errorText ?? ''} />
		</>
	)
}

export default TranslateButton
