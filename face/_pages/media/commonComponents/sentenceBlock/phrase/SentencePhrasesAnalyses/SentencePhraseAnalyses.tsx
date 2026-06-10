import { findSentenceEntry } from '@/_pages/media/detailsBlock/DetailsBlock/fn/selectors'
import { useDetailsStore } from '@/_pages/media/detailsBlock/detailsStore'
import SentencePhrase from '_pages/media/commonComponents/sentenceBlock/phrase/SentencePhrase/SentencePhrase'
import './SentencePhraseAnalyses.scss'

type SentencePhraseAnalysesProps = {
	languageCode: string
}

function SentencePhraseAnalyses(props: SentencePhraseAnalysesProps) {
	const { languageCode } = props

	const currentSentenceId = useDetailsStore((s) => s.currentSentenceId)
	const phrases = useDetailsStore(function (s) {
		const entry = findSentenceEntry({
			sentences: s.sentences,
			sentenceId: currentSentenceId,
		})

		return entry?.data.phrases ?? null
	})

	if (!phrases || currentSentenceId === null) return null

	// Сортировка чтобы фразы шли в том порядке, в котором они находятся в предложении
	const sortedPhrases = [...phrases].sort((a, b) => (a.wordIds[0] ?? 0) - (b.wordIds[0] ?? 0))

	return (
		<div className='sentence-phrase-analyses'>
			{sortedPhrases.map((analysis) => {
				return (
					<div key={analysis.randomGeneratedPhraseId}>
						<SentencePhrase
							phraseAnalysis={analysis}
							sentenceId={currentSentenceId}
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
