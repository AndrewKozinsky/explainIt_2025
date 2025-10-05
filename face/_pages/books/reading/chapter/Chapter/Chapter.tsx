import { useReadingStore } from '_pages/books/reading/readingStore'
import ChapterText from '../ChapterText/ChapterText'
import './Chapter.scss'

function Chapter() {
	const populatedChapter = useReadingStore((state) => state.populatedChapter)
	if (!populatedChapter) return null

	return (
		<div className='reading-chapter'>
			<ChapterText />
		</div>
	)
}

export default Chapter
