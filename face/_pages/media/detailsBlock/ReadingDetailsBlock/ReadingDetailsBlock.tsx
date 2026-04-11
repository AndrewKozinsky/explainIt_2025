import { useReadingStore } from '_pages/media/reading/readingStore'
import { useDetailsStore } from '../detailsStore'
import { SelectedSentence } from '../SelectedSentence/SelectedSentence'
import { SentenceTranslation } from '../SentenceTranslation/SentenceTranslation'
import SentenceWordAnalysis from '../SentenceWordAnalysis/SentenceWordAnalysis'

function ReadingDetailsBlock() {
	const wordAnalysis = useDetailsStore((s) => s.wordAnalysis)
	const book = useReadingStore((s) => s.book?.data)

	return (
		<>
			<SelectedSentence />
			<SentenceTranslation bgColor='gray' />
			<SentenceWordAnalysis wordAnalysis={wordAnalysis} languageCode={book?.languageCode!} />
		</>
	)
}

export default ReadingDetailsBlock
