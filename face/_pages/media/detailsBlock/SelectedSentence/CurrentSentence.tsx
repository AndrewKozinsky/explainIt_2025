import SentenceBlock from '_pages/media/commonComponents/SentenceBlock/SentenceBlock'
import { useGetShowingMediaType } from '_pages/media/detailsBlock/DetailsBlock/fn/populateStore'
import { findSentenceEntry } from '_pages/media/detailsBlock/DetailsBlock/fn/selectors'
import { useReadingStore } from '_pages/media/reading/readingStore'
import { useWatchingStore } from '_pages/media/watching/watchingStore'
import { useDetailsStore } from '../detailsStore'
import './SelectedSentence.scss'

export function CurrentSentence() {
	const mediaType = useGetShowingMediaType()

	const sentenceId = useDetailsStore((s) => s.currentSentenceId)
	const currentSentenceText = useDetailsStore((s) => s.currentSentenceText)

	const sentenceAnalysisLoading = useDetailsStore(function (s) {
		const entry = findSentenceEntry({
			sentences: s.sentences,
			sentenceId: s.currentSentenceId,
		})
		return entry?.data.sentence.loading ?? false
	})

	const readingWordId = useReadingStore((s) => s.selection.wordId)
	const watchingWordId = useWatchingStore((s) => s.selection.wordId)
	const readingSelectWord = useReadingStore((s) => s.selectWord)
	const watchingSelectWord = useWatchingStore((s) => s.selectWord)

	const wordId = mediaType === 'book' ? readingWordId : watchingWordId
	const selectWord = mediaType === 'book' ? readingSelectWord : watchingSelectWord

	if (!sentenceId || !currentSentenceText) {
		return null
	}

	return (
		<SentenceBlock
			sentenceId={sentenceId}
			sentenceText={currentSentenceText}
			selectedSentenceId={sentenceId}
			selectedWordId={wordId}
			selectWord={selectWord}
			extraClass='selected-sentence'
			loading={sentenceAnalysisLoading}
		/>
	)
}
