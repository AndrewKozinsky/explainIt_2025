import { SentencePhraseType } from '_pages/media/detailsBlock/detailsStore'
import SentencePhraseExample from '../SentencePhraseExample/SentencePhraseExample'
import '_pages/media/commonComponents/sentenceBlock/phrase/SentencePhraseContent/SentencePhraseContent.scss'
import SentencePhraseTop from '../SentencePhraseTop/SentencePhraseTop'

type SentencePhraseProps = {
	phraseAnalysis: SentencePhraseType
	languageCode: string
	onWhiteBackground?: boolean
}

function SentencePhraseContent(props: SentencePhraseProps) {
	const { phraseAnalysis, languageCode, onWhiteBackground } = props

	if (!phraseAnalysis || phraseAnalysis.loading || phraseAnalysis.error) {
		return null
	}

	const phrase = phraseAnalysis.phrase
	const phraseTranslation = phraseAnalysis.translation
	const examples = phraseAnalysis.examples

	if (!phrase || !phraseTranslation || !phraseAnalysis.sentencePhraseId) {
		return null
	}

	return (
		<>
			<SentencePhraseTop
				phrase={phrase}
				phraseTranslation={phraseTranslation}
				sentencePhraseId={phraseAnalysis.sentencePhraseId}
				flashcardId={phraseAnalysis.flashcardId}
				languageCode={languageCode}
				onWhiteBackground={onWhiteBackground}
			/>
			{examples?.map((example, i) => {
				return <SentencePhraseExample example={example} key={i} />
			})}
		</>
	)
}

export default SentencePhraseContent
