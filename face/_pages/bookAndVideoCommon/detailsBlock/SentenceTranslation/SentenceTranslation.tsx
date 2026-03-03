import cn from 'classnames'
import { useDetailsStore } from '../detailsStore'
import './SentenceTranslation.scss'

export function SentenceTranslation() {
	const sentenceTranslation = useDetailsStore((s) => s.sentenceTranslation)

	if (!sentenceTranslation) {
		return null
	}

	const isLongText = sentenceTranslation.length > 100

	return (
		<p className={cn('sentence-translation', isLongText && 'sentence-translation--small')}>{sentenceTranslation}</p>
	)
}
