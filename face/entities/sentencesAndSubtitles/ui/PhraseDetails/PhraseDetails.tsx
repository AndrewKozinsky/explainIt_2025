// import { useMediaStoreContext } from '@/entities/media/store/MediaStoreContext'
// import SentencePhrase from '../phrase/SentencePhrase/SentencePhrase'

/*type PhraseDetailsProps = {
	sentenceId: number
	languageCode: string
}*/

/*function PhraseDetails(props: PhraseDetailsProps) {
	const { sentenceId, languageCode } = props

	const mediaStore = useMediaStoreContext()
	const coveringPhrase = mediaStore(function (store) {
		const sentence = store.sentences.find((entry) => entry.sentenceId === sentenceId)
		if (!sentence || !sentence.selectedPhraseId) return null

		return sentence.data.phrases.find((p) => p.randomGeneratedPhraseId === sentence.selectedPhraseId) ?? null
	})

	if (!coveringPhrase) {
		return null
	}

	return <SentencePhrase phraseAnalysis={coveringPhrase} sentenceId={sentenceId} languageCode={languageCode} />
}*/

// export default PhraseDetails
