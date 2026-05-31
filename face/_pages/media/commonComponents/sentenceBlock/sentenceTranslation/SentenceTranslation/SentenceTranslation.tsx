import ErrorMessage from 'ui/ErrorMessage/ErrorMessage'
import { findSentenceEntry } from '_pages/media/detailsBlock/DetailsBlock/fn/selectors'
import { useDetailsStore } from '_pages/media/detailsBlock/detailsStore'
import SentenceTranslationContentWrapper from '../SentenceTranslationContentWrapper/SentenceTranslationContentWrapper'

type SentenceTranslationProps = {
	sentenceId: number
	bgColor: 'white' | 'gray'
}

function SentenceTranslation(props: SentenceTranslationProps) {
	const { sentenceId, bgColor } = props

	const sentenceEntry = useDetailsStore(function (s) {
		return findSentenceEntry({ sentences: s.sentences, sentenceId })
	})

	if (!sentenceEntry || !sentenceEntry.data.translation.visible) {
		return null
	}

	const loading = sentenceEntry.data.translation.loading
	const error = sentenceEntry.data.translation.error
	const translationText = sentenceEntry.data.translation.text

	return (
		<SentenceTranslationContentWrapper loading={loading} bgColor={bgColor}>
			{loading && <span />}
			{error && <ErrorMessage text={sentenceEntry.data.translation.error} />}
			{translationText && translationText}
		</SentenceTranslationContentWrapper>
	)
}

export default SentenceTranslation
