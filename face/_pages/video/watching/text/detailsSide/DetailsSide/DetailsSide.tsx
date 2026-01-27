import SelectedSentenceBlock from '_pages/readingAndWatchingCommon/selectedSentenceBlock/SelectedSentenceBlock/SelectedSentenceBlock'
import { useGetSelectedSentenceData } from '_pages/video/watching/text/detailsSide/DetailsSide/fn/getSelectedSentenceData'
import { useWatchingStore } from '_pages/video/watching/watchingStore'
import DetailsHelp from '../DetailsHelp/DetailsHelp'
// import DetailsSentence from '../DetailsSentence/DetailsSentence'
// import PhraseAnalysis from '../PhraseAnalysis/PhraseAnalysis'
import './DetailsSide.scss'

function DetailsSide() {
	const { sentenceId, sentenceText, wordIds } = useGetSelectedSentenceData()

	if (!sentenceId || !sentenceText || !wordIds.length) {
		return <DetailsHelp />
	}

	return <SelectedSentenceBlock sentenceId={sentenceId} sentenceText={sentenceText} wordIds={wordIds} />
}

export default DetailsSide
