import SentenceBlock from '_pages/media/commonComponents/SentenceBlock/SentenceBlock'
import { useGetShowingMediaType } from '_pages/media/detailsBlock/DetailsBlock/fn/populateStore'
import { findSentenceEntry } from '_pages/media/detailsBlock/DetailsBlock/fn/selectors'
import { useReadingStore } from '_pages/media/reading/readingStore'
import { useWatchingStore } from '_pages/media/watching/watchingStore'
import { useDetailsStore } from '../detailsStore'
import './SelectedSentence.scss'

export function SelectedSentence() {
	const mediaType = useGetShowingMediaType()

	const sentenceId = useDetailsStore((s) => s.currentSentenceId)
	const sentenceText = useDetailsStore(function (s) {
		const entry = findSentenceEntry({
			sentences: s.sentences,
			sentenceId: s.currentSentenceId,
		})
		return entry?.data.sentence.text ?? null
	})
	const sentenceAnalysisLoading = useDetailsStore(function (s) {
		const entry = findSentenceEntry({
			sentences: s.sentences,
			sentenceId: s.currentSentenceId,
		})
		return entry?.data.sentence.loading ?? false
	})

	const readingWordIds = useReadingStore((s) => s.selection.wordIds)
	const watchingWordIds = useWatchingStore((s) => s.selection.wordIds)
	const readingSelectWord = useReadingStore((s) => s.selectWord)
	const watchingSelectWord = useWatchingStore((s) => s.selectWord)

	const wordIds = mediaType === 'book' ? readingWordIds : watchingWordIds
	const selectWord = mediaType === 'book' ? readingSelectWord : watchingSelectWord

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
