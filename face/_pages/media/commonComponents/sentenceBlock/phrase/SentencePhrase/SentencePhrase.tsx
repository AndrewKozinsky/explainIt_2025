import cn from 'classnames'
import SentencePhraseLoading from '_pages/media/commonComponents/sentenceBlock/phrase/SentencePhraseLoading/SentencePhraseLoading'
import { SentencePhraseType } from '_pages/media/detailsBlock/detailsStore'
import SentencePhraseContent from '../SentencePhraseContent/SentencePhraseContent'
import SentencePhraseError from '../SentencePhraseError/SentencePhraseError'
import './SentencePhrase.scss'

type SentencePhraseProps = {
	phraseAnalysis: SentencePhraseType
	sentenceId: number
	extraClass?: string
	languageCode: string
	onWhiteBackground?: boolean
}

function SentencePhrase(props: SentencePhraseProps) {
	const { phraseAnalysis, sentenceId, extraClass, languageCode, onWhiteBackground } = props

	return (
		<div className={cn('sentence-phrase', extraClass)}>
			<SentencePhraseLoading phraseAnalysis={phraseAnalysis} />
			<SentencePhraseError phraseAnalysis={phraseAnalysis} sentenceId={sentenceId} />
			<SentencePhraseContent
				phraseAnalysis={phraseAnalysis}
				languageCode={languageCode}
				onWhiteBackground={onWhiteBackground}
			/>
		</div>
	)
}

export default SentencePhrase
