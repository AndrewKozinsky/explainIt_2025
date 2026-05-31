import ErrorMessage from 'ui/ErrorMessage/ErrorMessage'
// import SentenceTranslationText from '@/_pages/media/detailsBlock/SentenceTranslationText/SentenceTranslationText'
import { findSentenceEntry } from '_pages/media/detailsBlock/DetailsBlock/fn/selectors'
import { useDetailsStore } from '_pages/media/detailsBlock/detailsStore'
// import { SentenceLoading } from '../ChapterContent/SentenceStatus'
import SentenceTranslationContentWrapper from '../SentenceTranslationContentWrapper/SentenceTranslationContentWrapper'

type SentenceTranslationProps = {
	sentenceId: number
}

function SentenceTranslation(props: SentenceTranslationProps) {
	const { sentenceId } = props

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
		<SentenceTranslationContentWrapper loading={loading} bgColor='gray'>
			{loading && <span />}
			{error && <ErrorMessage text={sentenceEntry.data.translation.error} />}
			{translationText && translationText}
		</SentenceTranslationContentWrapper>
	)
}

export default SentenceTranslation
