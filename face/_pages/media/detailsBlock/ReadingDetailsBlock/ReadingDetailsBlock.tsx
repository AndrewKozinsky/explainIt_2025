import SentencePhraseAnalyses from '_pages/media/detailsBlock/SentencePhrasesAnalyses/SentencePhraseAnalyses'
import { useReadingStore } from '_pages/media/reading/readingStore'
import SentenceChat from '_pages/media/sentenceChat/SentenceChat/SentenceChat'
import { useDetailsStore } from '../detailsStore'

function ReadingDetailsBlock() {
	const book = useReadingStore((s) => s.book?.data)
	const sentenceId = useDetailsStore((s) => s.sentenceId)

	return (
		<div>
			<SentencePhraseAnalyses languageCode={book?.languageCode!} />
			{sentenceId && <SentenceChat sentenceId={sentenceId} />}
		</div>
	)
}

export default ReadingDetailsBlock
