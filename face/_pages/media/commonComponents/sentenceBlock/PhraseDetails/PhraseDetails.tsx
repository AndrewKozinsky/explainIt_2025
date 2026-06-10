import SentencePhrase from '_pages/media/commonComponents/sentenceBlock/phrase/SentencePhrase/SentencePhrase'
import { findSentenceEntry } from '_pages/media/detailsBlock/DetailsBlock/fn/selectors'
import { useDetailsStore } from '_pages/media/detailsBlock/detailsStore'

type PhraseDetailsProps = {
	sentenceId: number
	languageCode: string
}

function PhraseDetails(props: PhraseDetailsProps) {
	const { sentenceId, languageCode } = props

	const coveringPhrase = useDetailsStore(function (store) {
		const entry = findSentenceEntry({ sentences: store.sentences, sentenceId })
		if (!entry || !entry.selectedPhraseId) return null

		return entry.data.phrases.find((p) => p.randomGeneratedPhraseId === entry.selectedPhraseId) ?? null
	})

	if (!coveringPhrase) {
		return null
	}

	return <SentencePhrase phraseAnalysis={coveringPhrase} sentenceId={sentenceId} languageCode={languageCode} />
}

export default PhraseDetails
