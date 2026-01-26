import { useReadingStore } from '_pages/books/reading/readingStore'
import SentenceBlock from '_pages/readingAndWatchingCommon/SentenceBlock/SentenceBlock'
import './ChapterContent.scss'

function ChapterContent() {
	const populatedChapter = useReadingStore((state) => state.populatedChapter)

	return (
		<div className='chapter-content'>
			{populatedChapter.sentences.map((sentence) => {
				return <SentenceBlock sentenceText={sentence.sentence} key={sentence.id} />
			})}
		</div>
	)
}

export default ChapterContent
