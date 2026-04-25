import {
	buildWordAnalysisFromPhrase,
	findCoveringPhrase,
	findSentenceEntry,
} from '_pages/media/detailsBlock/DetailsBlock/fn/selectors'
import SentencePhraseAnalysis from '_pages/media/detailsBlock/SentencePhraseAnalysis/SentencePhraseAnalysis'
import SentenceChat from '_pages/media/sentenceChat/SentenceChat/SentenceChat'
import { useWatchingStore } from '_pages/media/watching/watchingStore'
import { useDetailsStore } from '../detailsStore'
import { SelectedSentence } from '../SelectedSentence/SelectedSentence'
import { SentenceTranslation } from '../SentenceTranslation/SentenceTranslation'
import './WatchingDetailsBlock.scss'

function WatchingDetailsBlock() {
	const sentenceId = useDetailsStore((s) => s.currentSentenceId)
	const wordAnalysis = useDetailsStore(function (s) {
		const entry = findSentenceEntry({
			sentences: s.sentences,
			sentenceId: s.currentSentenceId,
		})
		if (!entry) return null

		const phrase = findCoveringPhrase({
			phrases: entry.data.phrases,
			startOffset: s.currentWordStartOffset,
			endOffset: s.currentWordEndOffset,
		})

		return buildWordAnalysisFromPhrase(phrase)
	})
	const video = useWatchingStore((s) => s.video?.data)

	return (
		<div className='watching-details-block'>
			<SelectedSentence />
			<SentenceTranslation bgColor='white' />
			<SentencePhraseAnalysis
				phraseAnalysis={wordAnalysis}
				languageCode={video?.languageCode!}
				onWhiteBackground
			/>
			{sentenceId && <SentenceChat sentenceId={sentenceId} />}
		</div>
	)
}

export default WatchingDetailsBlock
