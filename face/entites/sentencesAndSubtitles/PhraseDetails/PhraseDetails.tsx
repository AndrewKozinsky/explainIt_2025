import { findSentenceEntry } from '@/entites/detailsBlock/DetailsBlock/fn/selectors'
import { useDetailsStore } from '@/entites/detailsBlock/detailsStore'
import SentencePhrase from '../phrase/SentencePhrase/SentencePhrase'

type PhraseDetailsProps = {
	sentenceId: number
	languageCode: string
}

function PhraseDetails(props: PhraseDetailsProps) {
	const { sentenceId, languageCode } = props

	const coveringPhrase = useDetailsStore(function (store) {
		const sentence = findSentenceEntry({ sentences: store.sentences, sentenceId })
		if (!sentence || !sentence.selectedPhraseId) return null

		return sentence.data.phrases.find((p) => p.randomGeneratedPhraseId === sentence.selectedPhraseId) ?? null
	})

	if (!coveringPhrase) {
		return null
	}

	return <SentencePhrase phraseAnalysis={coveringPhrase} sentenceId={sentenceId} languageCode={languageCode} />
}

export default PhraseDetails
