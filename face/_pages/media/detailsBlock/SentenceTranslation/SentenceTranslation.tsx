import cn from 'classnames'
import { findSentenceEntry } from '_pages/media/detailsBlock/DetailsBlock/fn/selectors'
import { useDetailsStore } from '../detailsStore'
import './SentenceTranslation.scss'

type SentenceTranslationProps = {
	bgColor: 'white' | 'gray'
}

export function SentenceTranslation(props: SentenceTranslationProps) {
	const { bgColor } = props

	const sentenceTranslation = useDetailsStore(function (s) {
		const entry = findSentenceEntry({
			sentences: s.sentences,
			sentenceId: s.currentSentenceId,
		})
		return entry?.data.sentence.translation ?? null
	})

	if (!sentenceTranslation) {
		return null
	}

	return <p className={cn('sentence-translation', 'sentence-translation--' + bgColor)}>{sentenceTranslation}</p>
}
