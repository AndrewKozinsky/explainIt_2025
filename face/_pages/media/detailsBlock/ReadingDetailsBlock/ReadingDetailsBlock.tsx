import SentencePhraseAnalyses from '_pages/media/detailsBlock/SentencePhrasesAnalyses/SentencePhraseAnalyses'
import { useReadingStore } from '_pages/media/reading/readingStore'

function ReadingDetailsBlock() {
	const book = useReadingStore((s) => s.book?.data)

	return <SentencePhraseAnalyses languageCode={book?.languageCode!} />
}

export default ReadingDetailsBlock
