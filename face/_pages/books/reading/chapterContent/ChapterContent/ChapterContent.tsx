import { useReadingStore } from '_pages/books/reading/readingStore'
import SentenceBlock from '../SentenceBlock/SentenceBlock'
import ChapterTooltip from '../ChapterTooltip/ChapterTooltip'
import './ChapterContent.scss'

function ChapterContent() {
	const populatedChapter = useReadingStore((state) => state.populatedChapter)

	return (
		<div className='chapter-content'>
			{populatedChapter.parts.map((sentence) => {
				return <SentenceBlock sentence={sentence} key={sentence.id} />
			})}
			<ChapterTooltip />
		</div>
	)
}

export default ChapterContent
