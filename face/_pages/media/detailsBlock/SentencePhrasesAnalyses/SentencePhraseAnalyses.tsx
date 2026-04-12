import SentencePhraseAnalysis from '_pages/media/detailsBlock/SentencePhraseAnalysis/SentencePhraseAnalysis'
import { useDetailsStore } from '../detailsStore'
import '_pages/media/detailsBlock/SentencePhrasesAnalyses/SentencePhraseAnalyses.scss'

type SentencePhraseAnalysesProps = {
	languageCode: string
}

function SentencePhraseAnalyses(props: SentencePhraseAnalysesProps) {
	const { languageCode } = props
	const phraseAnalyses = useDetailsStore((s) => s.wordAnalyses)

	if (!phraseAnalyses.length) return null

	return (
		<div className='sentence-phrase-analyses'>
			{phraseAnalyses.map((analysis, index) => {
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
