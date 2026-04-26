import { CurrentSentenceTranslation } from '_pages/media/detailsBlock/CurrentSentenceTranslation/CurrentSentenceTranslation'
import { findCoveringPhrase, findSentenceEntry } from '_pages/media/detailsBlock/DetailsBlock/fn/selectors'
import { CurrentSentence } from '_pages/media/detailsBlock/SelectedSentence/CurrentSentence'
import SentencePhraseAnalysis from '_pages/media/detailsBlock/SentencePhraseAnalysis/SentencePhraseAnalysis'
// import SentenceChat from '_pages/media/sentenceChat/SentenceChat/SentenceChat'
import { useWatchingStore } from '_pages/media/watching/watchingStore'
import { useDetailsStore } from '../detailsStore'
import './WatchingDetailsBlock.scss'

function WatchingDetailsBlock() {
	// const sentenceId = useDetailsStore((s) => s.currentSentenceId)

	const wordAnalysis = useDetailsStore(function (s) {
		const entry = findSentenceEntry({
			sentences: s.sentences,
			sentenceId: s.currentSentenceId,
		})
		if (!entry) return null

		return findCoveringPhrase({
			phrases: entry.data.phrases,
			startOffset: s.currentWordStartOffset,
			endOffset: s.currentWordEndOffset,
		})
	})

	const video = useWatchingStore((s) => s.video?.data)

	return (
		<div className='watching-details-block'>
			<CurrentSentence />
			<CurrentSentenceTranslation bgColor='white' />
			{wordAnalysis && (
				<SentencePhraseAnalysis
					phraseAnalysis={wordAnalysis}
					languageCode={video?.languageCode!}
					onWhiteBackground
				/>
			)}
			{/*{sentenceId && <SentenceChat sentenceId={sentenceId} />}*/}
		</div>
	)
}

export default WatchingDetailsBlock
