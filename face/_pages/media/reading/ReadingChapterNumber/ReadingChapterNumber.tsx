import { useReadingStore } from '_pages/media/reading/readingStore'
import './ReadingChapterNumber.scss'

function ReadingChapterNumber() {
	const header = useReadingStore((store) => store.populatedChapter.header)
	const name = useReadingStore((store) => store.populatedChapter.name)

	if (!header || !name) return null

	return <p className='reading-chapter-number'>{name}</p>
}

export default ReadingChapterNumber
