import StyledAnalysis from '_pages/media/commonComponents/detailsBlock/SentenceAnalysis/StyledAnalysis'
import { useDetailsStore } from '../detailsStore'

function ReadingDetailsBlock() {
	const sentenceAnalysis = useDetailsStore((s) => s.sentenceAnalysis)

	return <StyledAnalysis analysis={sentenceAnalysis || ''} />
}

export default ReadingDetailsBlock
