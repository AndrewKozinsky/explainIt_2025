import { useMediaStoreContext } from '@/entities/media/store/MediaStoreContext'
import SentencePhrase from '../SentencePhrase/SentencePhrase'
import './SentencePhraseAnalyses.scss'

type SentencePhraseAnalysesProps = {
	languageCode: string
}

function SentencePhraseAnalyses(props: SentencePhraseAnalysesProps) {
	const { languageCode } = props

	const mediaStore = useMediaStoreContext()
	const currentSentenceId = mediaStore((s) => s.selectedSentenceId)
	const phrases = mediaStore(function (s) {
		const entry = s.sentences.find((item) => item.sentenceId === currentSentenceId)

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
