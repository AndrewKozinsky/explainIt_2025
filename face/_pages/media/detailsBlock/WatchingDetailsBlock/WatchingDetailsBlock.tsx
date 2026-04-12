import SentencePhraseAnalysis from '_pages/media/detailsBlock/SentencePhraseAnalysis/SentencePhraseAnalysis'
import { useWatchingStore } from '_pages/media/watching/watchingStore'
import { useDetailsStore } from '../detailsStore'
import { SelectedSentence } from '../SelectedSentence/SelectedSentence'
import { SentenceTranslation } from '../SentenceTranslation/SentenceTranslation'
import './WatchingDetailsBlock.scss'

function WatchingDetailsBlock() {
	const wordAnalysis = useDetailsStore((s) => s.wordAnalysis)
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
		</div>
	)
}

export default WatchingDetailsBlock
