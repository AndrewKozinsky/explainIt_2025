import { useWatchingStore } from '_pages/media/watching/watchingStore'
import { useDetailsStore } from '../detailsStore'
import { SelectedSentence } from '../SelectedSentence/SelectedSentence'
import { SentenceTranslation } from '../SentenceTranslation/SentenceTranslation'
import SentenceWordAnalysis from '../SentenceWordAnalysis/SentenceWordAnalysis'
import './WatchingDetailsBlock.scss'

function WatchingDetailsBlock() {
	const wordAnalysis = useDetailsStore((s) => s.wordAnalysis)
	const video = useWatchingStore((s) => s.video?.data)

	return (
		<div className='watching-details-block'>
			<SelectedSentence />
			<SentenceTranslation bgColor='white' />
			<SentenceWordAnalysis wordAnalysis={wordAnalysis} languageCode={video?.languageCode!} />
		</div>
	)
}

export default WatchingDetailsBlock
