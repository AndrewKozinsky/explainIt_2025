import Paragraph from '@/ui/Paragraph/Paragraph'
import AddChapterButton from '../AddChapterButton/AddChapterButton'
import BookButton from '../BookButton/BookButton'
import ChaptersList from '../ChaptersList/ChaptersList'
import { useBooksStore } from '_pages/books/books/booksStore'
import './ChaptersSection.scss'

function ChaptersSection() {
	const pageType = useBooksStore((s) => s.pageType)
	const currentBook = useBooksStore((s) => s.book)

	if (pageType === 'books') {
		return null
	}

	if (!currentBook) {
		return <Paragraph fontSize='15'>Запрошенной книги не существует.</Paragraph>
	}

	return (
		<div className='books-section'>
			<BookButton />
			<ChaptersList />
			<AddChapterButton />
		</div>
	)
}

export default ChaptersSection
