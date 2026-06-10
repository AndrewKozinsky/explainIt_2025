import { SentencePhraseType } from '_pages/media/detailsBlock/detailsStore'
import './SentencePhraseLoading.scss'

type SentencePhraseLoadingProps = {
	phraseAnalysis: SentencePhraseType
}

function SentencePhrase(props: SentencePhraseLoadingProps) {
	const { phraseAnalysis } = props

	if (!phraseAnalysis) {
		return null
	}

	if (phraseAnalysis.loading) {
		return (
			<>
				<div className='sentence-phrase-loading__item sentence-phrase-loading__item-one' />
				<div className='sentence-phrase-loading__item sentence-phrase-loading__item-two' />
				<div className='sentence-phrase-loading__item sentence-phrase-loading__item-three' />
			</>
		)
	}

	return null
}

export default SentencePhrase
