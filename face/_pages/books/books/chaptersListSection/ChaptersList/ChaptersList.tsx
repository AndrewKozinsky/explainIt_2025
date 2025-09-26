import ChapterLink from '../ChapterLink/ChapterLink'
import { booksFetcher } from '_pages/books/commonLogic/booksFetcher'
import Paragraph from 'ui/Paragraph/Paragraph'
import Spinner from 'ui/Spinner/Spinner'
import './ChaptersList.scss'

function ChaptersList() {
	const getBookRes = booksFetcher.useGetCurrentBook()

	if (getBookRes.status === 'loading') {
		return <Spinner />
	}
	if (getBookRes.status === 'noData') {
		return <Paragraph fontSize={16}>Книга не найдена</Paragraph>
	}
	if (getBookRes.status !== 'success') {
		return null
	}

	const book = getBookRes.data
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
