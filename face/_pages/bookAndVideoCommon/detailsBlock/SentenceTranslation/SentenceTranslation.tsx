import { useDetailsStore } from '../detailsStore'
import './SentenceTranslation.scss'

export function SentenceTranslation() {
	const sentenceTranslation = useDetailsStore((s) => s.sentenceTranslation)

	if (!sentenceTranslation) {
		return null
	}

	return <p className='sentence-translation'>{sentenceTranslation}</p>
}
