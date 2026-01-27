import { useSelectedSentenceStore } from '_pages/readingAndWatchingCommon/selectedSentence/selectedSentenceStore'
import SentenceBlock from '_pages/readingAndWatchingCommon/SentenceBlock/SentenceBlock'
import './SelectedSentence.scss'

export function SelectedSentence() {
	const sentenceId = useSelectedSentenceStore((s) => s.sentenceId)
	const sentenceText = useSelectedSentenceStore((s) => s.sentenceText)
	const wordIds = useSelectedSentenceStore((s) => s.wordIds)
	const selectWord = useSelectedSentenceStore((s) => s.selectWord)

	return (
		<SentenceBlock
			sentenceId={sentenceId}
			sentenceText={sentenceText}
			selectedSentenceId={sentenceId}
			selectedWordIds={wordIds}
			selectWord={selectWord}
			className='selected-sentence'
		/>
	)
}
