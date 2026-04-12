import { useReadingStore } from '_pages/media/reading/readingStore'
import SentenceWordAnalyses from '../SentenceWordAnalyses/SentenceWordAnalyses'

function ReadingDetailsBlock() {
	const book = useReadingStore((s) => s.book?.data)

	return <SentenceWordAnalyses languageCode={book?.languageCode!} />
}

export default ReadingDetailsBlock
