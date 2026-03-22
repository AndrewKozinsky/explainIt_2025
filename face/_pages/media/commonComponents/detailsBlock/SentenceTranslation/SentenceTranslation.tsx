import cn from 'classnames'
import { useDetailsStore } from '../detailsStore'
import './SentenceTranslation.scss'

type SentenceTranslationProps = {
	bgColor: 'white' | 'gray'
}

export function SentenceTranslation(props: SentenceTranslationProps) {
	const { bgColor } = props

	const sentenceTranslation = useDetailsStore((s) => s.sentenceTranslation)

	if (!sentenceTranslation) {
		return null
	}

	return <p className={cn('sentence-translation', 'sentence-translation--' + bgColor)}>{sentenceTranslation}</p>
}
