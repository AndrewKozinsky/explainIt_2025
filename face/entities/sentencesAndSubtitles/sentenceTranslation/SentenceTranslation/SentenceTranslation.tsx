import cn from 'classnames'
import { useMediaStoreContext } from '@/entities/media/store/MediaStoreContext'
import SentenceTranslationContent from '@/entities/sentencesAndSubtitles/sentenceTranslation/SentenceTranslationContent/SentenceTranslationContent'
import SentenceTranslationError from '@/entities/sentencesAndSubtitles/sentenceTranslation/SentenceTranslationError/SentenceTranslationError'
import SentenceTranslationLoading from '@/entities/sentencesAndSubtitles/sentenceTranslation/SentenceTranslationLoading/SentenceTranslationLoading'
import './SentenceTranslation.scss'

type SentenceTranslationProps = {
	sentenceId: number
	bgColor: 'white' | 'gray'
}

function SentenceTranslation(props: SentenceTranslationProps) {
	const { sentenceId, bgColor } = props

	const mediaStore = useMediaStoreContext()
	const sentenceEntry = mediaStore((s) => s.sentences.find((entry) => entry.sentenceId === sentenceId))

	if (!sentenceEntry || !sentenceEntry.data.translation.visible) {
		return null
	}

	const loading = sentenceEntry.data.translation.loading
	const error = sentenceEntry.data.translation.error
	const translationText = sentenceEntry.data.translation.text

	return (
		<div
			className={cn(
				'sentence-translation',
				'sentence-translation--' + bgColor,
				loading && 'sentence-translation--loading',
			)}
		>
			<SentenceTranslationLoading loading={loading} />
			<SentenceTranslationError sentenceId={sentenceId} error={error} />
			<SentenceTranslationContent translationText={translationText} />
		</div>
	)
}

export default SentenceTranslation
