import SentenceButtons from '_pages/readingAndWatchingCommon/selectedSentence/DetailsSentence/SentenceButtons'
import { SelectedSentence } from '_pages/readingAndWatchingCommon/selectedSentence/SelectedSentence/SelectedSentence'
import SentenceAnalysis from '_pages/readingAndWatchingCommon/selectedSentence/SelectedSentenceBlock/SentenceAnalysis'
import { useSelectedSentenceStore } from '_pages/readingAndWatchingCommon/selectedSentence/selectedSentenceStore'
import { usePopulateStore } from './fn/populateStore'
import { useSyncSentenceTranslations } from './fn/useSyncSentenceTranslations'
import './SelectedSentenceBlock.scss'

function SelectedSentenceBlock() {
	usePopulateStore()
	useSyncSentenceTranslations()

	const sentenceId = useSelectedSentenceStore((s) => s.sentenceId)
	const wordIds = useSelectedSentenceStore((s) => s.wordIds)

	if (!sentenceId || !wordIds.length) return null

	return (
		<div className='details-side'>
			<SelectedSentence />
			<SentenceButtons />
			<SentenceAnalysis />
			{/*<PhraseAnalysis />*/}
		</div>
	)
}

export default SelectedSentenceBlock
