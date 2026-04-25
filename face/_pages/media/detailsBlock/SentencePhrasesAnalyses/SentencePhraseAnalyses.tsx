import { useMemo } from 'react'
import { buildWordAnalysesFromPhrases, findSentenceEntry } from '_pages/media/detailsBlock/DetailsBlock/fn/selectors'
import SentencePhraseAnalysis from '_pages/media/detailsBlock/SentencePhraseAnalysis/SentencePhraseAnalysis'
import { useDetailsStore } from '../detailsStore'
import '_pages/media/detailsBlock/SentencePhrasesAnalyses/SentencePhraseAnalyses.scss'

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

	const phraseAnalyses = useMemo(
		function () {
			if (!phrases) return [] as string[]
			return buildWordAnalysesFromPhrases(phrases)
		},
		[phrases],
	)

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
