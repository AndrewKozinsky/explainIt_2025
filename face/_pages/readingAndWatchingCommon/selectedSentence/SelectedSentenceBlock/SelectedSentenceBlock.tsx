import SentenceButtons from '_pages/readingAndWatchingCommon/selectedSentence/DetailsSentence/SentenceButtons'
import { SelectedSentence } from '_pages/readingAndWatchingCommon/selectedSentence/SelectedSentence/SelectedSentence'
import { useSelectedSentenceStore } from '_pages/readingAndWatchingCommon/selectedSentence/selectedSentenceStore'
import { usePopulateStore } from './fn/populateStore'

function SelectedSentenceBlock() {
	usePopulateStore()

	const sentenceId = useSelectedSentenceStore((s) => s.sentenceId)
	const wordIds = useSelectedSentenceStore((s) => s.wordIds)

	if (!sentenceId || !wordIds.length) return null

	return (
		<div className='details-side'>
			<SelectedSentence />
			<SentenceButtons />
			{/*<PhraseAnalysis />*/}
		</div>
	)
}

export default SelectedSentenceBlock
