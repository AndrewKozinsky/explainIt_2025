import ErrorMessage from 'ui/ErrorMessage/ErrorMessage'
import LoadingMessage from 'ui/LoadingMessage/LoadingMessage'
import Paragraph from 'ui/Paragraph/Paragraph'
import BookLink from '_pages/books/books/booksListSection/BookLink/BookLink'
import { useBooksStore } from '_pages/books/books/booksStore'

export function PrivateBooksListContent() {
	const privateBooks = useBooksStore((state) => state.privateBooks)

	if (privateBooks.loading) {
		return <LoadingMessage text='Загрузка...' />
	} else if (privateBooks.errorMessage) {
		return <ErrorMessage text={privateBooks.errorMessage} />
	} else if (!privateBooks.data.length) {
		return <Paragraph fontSize={16}>Не создано ни одной книги</Paragraph>
	}

	return (
		<>
			{privateBooks.data.map((book) => {
				const bookWithType = { ...book, bookType: 'private' as const }

				return <BookLink bookData={bookWithType} key={book.id} />
			})}
		</>
	)
}
