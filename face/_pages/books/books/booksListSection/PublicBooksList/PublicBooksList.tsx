import { SectionWithHeader } from '_pages/books/books/common/SectionWithHeader/SectionWithHeader'
import ErrorMessage from 'ui/ErrorMessage/ErrorMessage'
import LoadingMessage from 'ui/LoadingMessage/LoadingMessage'
import Paragraph from 'ui/Paragraph/Paragraph'
import BookLink from '../BookLink/BookLink'
import { useBooksStore } from '_pages/books/books/booksStore'

function PublicBooksList() {
	return (
		<SectionWithHeader title='Публичные книги'>
			<PublicBooksListContent />
		</SectionWithHeader>
	)
}

export default PublicBooksList

function PublicBooksListContent() {
	const publicBooks = useBooksStore((state) => state.publicBooks)

	if (publicBooks.loading) {
		return <LoadingMessage text='Загрузка...' />
	} else if (publicBooks.errorMessage) {
		return <ErrorMessage text={publicBooks.errorMessage} />
	} else if (!publicBooks.data.length) {
		return <Paragraph fontSize={16}>Нет ни одной книги</Paragraph>
	}

	return (
		<>
			{publicBooks.data.map((book) => {
				const bookWithType = { ...book, bookType: 'public' as const }

				return <BookLink bookData={bookWithType} key={book.id} />
			})}
		</>
	)
}
