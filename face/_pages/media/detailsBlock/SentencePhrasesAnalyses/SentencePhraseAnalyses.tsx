import { findSentenceEntry } from '_pages/media/detailsBlock/DetailsBlock/fn/selectors'
import SentencePhraseAnalysis from '_pages/media/detailsBlock/SentencePhraseAnalysis/SentencePhraseAnalysis'
import { useDetailsStore } from '../detailsStore'
import './SentencePhraseAnalyses.scss'

type SentencePhraseAnalysesProps = {
	languageCode: string
}

function SentencePhraseAnalyses(props: SentencePhraseAnalysesProps) {
	const { languageCode } = props

	const phrases = useDetailsStore(function (s) {
		const entry = findSentenceEntry({
			sentences: s.sentences,
			sentenceId: s.currentSentenceId,
		})

		return entry?.data.phrases ?? null
	})

	if (!phrases) return null

	return (
		<div className='sentence-phrase-analyses'>
			{phrases.map((analysis, index) => {
				return (
					<div className='sentence-word-analyses__item' key={`${index}-${analysis}`}>
						<SentencePhraseAnalysis
							phraseAnalysis={analysis}
							languageCode={languageCode}
							onWhiteBackground
						/>
					</div>
				)
			})}
		</div>
	)
}

export default SentencePhraseAnalyses
