import cn from 'classnames'
import { findSentenceEntry } from '@/entites/detailsBlock/DetailsBlock/fn/selectors'
import { useDetailsStore } from '@/entites/detailsBlock/detailsStore'
import SentenceTranslationContent from '@/entites/sentencesAndSubtitles/sentenceTranslation/SentenceTranslationContent/SentenceTranslationContent'
import SentenceTranslationError from '@/entites/sentencesAndSubtitles/sentenceTranslation/SentenceTranslationError/SentenceTranslationError'
import SentenceTranslationLoading from '@/entites/sentencesAndSubtitles/sentenceTranslation/SentenceTranslationLoading/SentenceTranslationLoading'
import './SentenceTranslation.scss'

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
		<p
			className={cn(
				'sentence-translation',
				'sentence-translation--' + bgColor,
				loading && 'sentence-translation--loading',
			)}
		>
			<SentenceTranslationLoading loading={loading} />
			<SentenceTranslationError sentenceId={sentenceId} error={error} />
			<SentenceTranslationContent translationText={translationText} />
		</p>
	)
}

export default SentenceTranslation
