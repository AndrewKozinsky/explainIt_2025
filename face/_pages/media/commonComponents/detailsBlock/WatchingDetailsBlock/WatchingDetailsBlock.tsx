import { SelectedSentence } from '_pages/media/commonComponents/detailsBlock/SelectedSentence/SelectedSentence'
import { SentenceTranslation } from '_pages/media/commonComponents/detailsBlock/SentenceTranslation/SentenceTranslation'
import SentenceWordAnalysis from '_pages/media/commonComponents/detailsBlock/SentenceWordAnalysis/SentenceWordAnalysis'
import { useDetailsStore } from '../detailsStore'
import './WatchingDetailsBlock.scss'

function WatchingDetailsBlock() {
	const wordAnalysis = useDetailsStore((s) => s.wordAnalysis)

	return (
		<div className='watching-details-block'>
			<SelectedSentence />
			<SentenceTranslation bgColor='white' />
			<SentenceWordAnalysis wordAnalysis={wordAnalysis} />
		</div>
	)
}

export default WatchingDetailsBlock
