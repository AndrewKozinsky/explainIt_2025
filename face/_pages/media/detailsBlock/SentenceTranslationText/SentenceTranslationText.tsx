import cn from 'classnames'
import './SentenceTranslationText.scss'

type SentenceTranslationTextProps = {
	translation: null | string
	bgColor: 'white' | 'gray'
}

function SentenceTranslationText(props: SentenceTranslationTextProps) {
	const { translation, bgColor } = props

	if (!translation) {
		return null
	}
	return <p className={cn('sentence-translation', 'sentence-translation--' + bgColor)}>{translation}</p>
}

export default SentenceTranslationText
