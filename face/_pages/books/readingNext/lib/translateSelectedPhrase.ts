import { useReadingStoreNext } from '_pages/books/readingNext/readingStoreNext'
import { canRunTranslation } from './canRunTranslation'

export function runTranslation() {
	if (!canRunTranslation()) return

	useReadingStoreNext.getState().createLoadingPhraseInSelectedSentenceFromSelectedWords()
}
