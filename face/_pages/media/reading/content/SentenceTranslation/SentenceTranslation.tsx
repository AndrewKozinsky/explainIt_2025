import ErrorMessage from 'ui/ErrorMessage/ErrorMessage'
import SentenceTranslationText from '@/_pages/media/detailsBlock/SentenceTranslationText/SentenceTranslationText'
import { findSentenceEntry } from '_pages/media/detailsBlock/DetailsBlock/fn/selectors'
import { useDetailsStore } from '_pages/media/detailsBlock/detailsStore'
import { SentenceLoading } from '../ChapterContent/SentenceStatus'

type SentenceTranslationProps = {
	sentenceId: number
}

function SentenceTranslation(props: SentenceTranslationProps) {
	const { sentenceId } = props

	const sentenceEntry = useDetailsStore(function (s) {
		return findSentenceEntry({ sentences: s.sentences, sentenceId })
	})

	if (!sentenceEntry) {
		return null
	}

	if (!sentenceEntry.data.translation.visible) {
		return null
	}

	if (sentenceEntry.data.translation.error) {
		return <ErrorMessage text={sentenceEntry.data.translation.error} />
	}

	if (sentenceEntry.data.translation.loading) {
		return <SentenceLoading />
	}

	return <SentenceTranslationText translation={sentenceEntry.data.translation.translation} bgColor='gray' />
}

export default SentenceTranslation
