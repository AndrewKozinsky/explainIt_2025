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

	// Сортировка чтобы фразы шли в том порядке, в котором они находятся в предложении
	const sortedPhrases = [...phrases].sort((a, b) => (a.wordIds[0] ?? 0) - (b.wordIds[0] ?? 0))

	return (
		<div className='sentence-phrase-analyses'>
			{sortedPhrases.map((analysis) => {
				return (
					<div key={analysis.randomGeneratedPhraseId}>
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
