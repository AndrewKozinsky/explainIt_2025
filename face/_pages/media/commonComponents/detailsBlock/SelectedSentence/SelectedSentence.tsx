import SentenceBlock from '_pages/media/commonComponents/SentenceBlock/SentenceBlock'
import { useDetailsStore } from '../detailsStore'
import './SelectedSentence.scss'

export function SelectedSentence() {
	const sentenceId = useDetailsStore((s) => s.sentenceId)
	const sentenceText = useDetailsStore((s) => s.sentenceText)
	const wordIds = useDetailsStore((s) => s.wordIds)
	const selectWord = useDetailsStore((s) => s.selectWord)
	const sentenceAnalysisLoading = useDetailsStore((s) => s.sentenceAnalysisLoading)

	if (!sentenceId || !sentenceText) {
		return null
	}

	return (
		<SentenceBlock
			sentenceId={sentenceId}
			sentenceText={sentenceText}
			selectedSentenceId={sentenceId}
			selectedWordIds={wordIds}
			selectWord={selectWord}
			extraClass='selected-sentence'
			loading={sentenceAnalysisLoading}
		/>
	)
}
