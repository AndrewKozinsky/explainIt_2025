import Punctuation from '../parts/Punctuation'
import Space from '../parts/Space'
import { useReadingStore } from '_pages/books/reading/readingStore'
import SentenceBlock from '../SentenceBlock/SentenceBlock'
import ChapterTooltip from '../ChapterTooltip/ChapterTooltip'
import './ChapterContent.scss'

function ChapterContent() {
	const populatedChapter = useReadingStore((state) => state.populatedChapter)

	return (
		<div className='chapter-content'>
			{populatedChapter.parts.map((sentence) => {
				if (sentence.type === 'sentence') {
					return <SentenceBlock sentence={sentence} key={sentence.id} />
				} else if (sentence.type === 'space') {
					return <Space key={sentence.id} />
				} else if (sentence.type === 'punctuation') {
					return <Punctuation key={sentence.id} value={sentence.value} />
				}
				return null
			})}
			<ChapterTooltip />
		</div>
	)
}

export default ChapterContent
