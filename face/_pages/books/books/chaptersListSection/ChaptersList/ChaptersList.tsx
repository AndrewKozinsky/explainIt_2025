import ChapterLink from '../ChapterLink/ChapterLink'
import Paragraph from 'ui/Paragraph/Paragraph'
import { useBooksStore } from '_pages/books/books/booksStore'
import './ChaptersList.scss'

function ChaptersList() {
	const book = useBooksStore((s) => s.book)

	if (!book || !book.chapters.length) return null

	return (
		<>
			<Paragraph fontSize='14' extraClass='chapters-list__header'>
				Главы
			</Paragraph>
			{book.chapters.map((chapter) => {
				return <ChapterLink bookId={book.id} chapterData={chapter} key={chapter.id} />
			})}
		</>
	)
}

export default ChaptersList
