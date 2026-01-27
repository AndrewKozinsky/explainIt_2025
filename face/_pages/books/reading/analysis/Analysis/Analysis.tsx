import SelectedSentenceBlock from '_pages/readingAndWatchingCommon/selectedSentence/SelectedSentenceBlock/SelectedSentenceBlock'
import HintBlock from '../HintBlock/HintBlock'
import { useGetSelectedSentenceData } from './fn/getSelectedSentenceData'
import './Analysis.scss'

function Analysis() {
	const { sentenceId, sentenceText, wordIds } = useGetSelectedSentenceData()

	if (!sentenceId || !sentenceText || !wordIds.length) {
		return null
	}

	return (
		<div className='analysis'>
			<SelectedSentenceBlock sentenceId={sentenceId} sentenceText={sentenceText} wordIds={wordIds} />
			<HintBlock />
		</div>
	)
}

export default Analysis
