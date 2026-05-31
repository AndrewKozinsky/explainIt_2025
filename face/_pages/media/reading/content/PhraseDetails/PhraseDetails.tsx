import { findSentenceEntry } from '_pages/media/detailsBlock/DetailsBlock/fn/selectors'
import { useDetailsStore } from '_pages/media/detailsBlock/detailsStore'
import SentencePhraseAnalysis from '../../../detailsBlock/SentencePhraseAnalysis/SentencePhraseAnalysis'

type PhraseDetailsProps = {
	sentenceId: number
	languageCode: string
}

function PhraseDetails(props: PhraseDetailsProps) {
	const { sentenceId, languageCode } = props

	const coveringPhrase = useDetailsStore(function (s) {
		const entry = findSentenceEntry({ sentences: s.sentences, sentenceId })
		if (!entry || !entry.selectedPhraseId) return null

		return entry.data.phrases.find((p) => p.randomGeneratedPhraseId === entry.selectedPhraseId) ?? null
	})

	if (!coveringPhrase) {
		return null
	}

	return (
		<SentencePhraseAnalysis
			phraseAnalysis={coveringPhrase}
			extraClass='chapter-content__word-analysis'
			languageCode={languageCode}
		/>
	)
}

export default PhraseDetails
