// import { findSentenceEntry } from '_pages/media/detailsBlock/DetailsBlock/fn/selectors'
// import { useDetailsStore } from '../detailsStore'
// import SentenceTranslationText from '../SentenceTranslationText/SentenceTranslationText'

/*type CurrentSentenceTranslationProps = {
	bgColor: 'white' | 'gray'
}*/

/*export function CurrentSentenceTranslation(props: CurrentSentenceTranslationProps) {
	const { bgColor } = props

	const sentenceTranslation = useDetailsStore(function (s) {
		const entry = findSentenceEntry({
			sentences: s.sentences,
			sentenceId: s.currentSentenceId,
		})
		return entry?.data.sentence.translation ?? null
	})

	if (!sentenceTranslation) {
		return null
	}

	return <SentenceTranslationText translation={sentenceTranslation} bgColor={bgColor} />
}*/
