import ErrorMessage from 'ui/ErrorMessage/ErrorMessage'
import Paragraph from 'ui/Paragraph/Paragraph'
import Spinner from 'ui/Spinner/Spinner'
import BookLink from '../BookLink/BookLink'
import { booksFetcher } from '@/_pages/books/commonLogic/booksFetcher'

function BooksList() {
	const getBooksRes = booksFetcher.useGetBooks()

	if (getBooksRes.status === 'loading') {
		return <Spinner />
	} else if (getBooksRes.status === 'error') {
		return <ErrorMessage text={getBooksRes.error.message} />
	} else if (getBooksRes.status === 'noData') {
		return <Paragraph fontSize={16}>Не создано ни одной книги</Paragraph>
	}

	return getBooksRes.data.map((book) => <BookLink bookData={book} key={book.id} />)
}

export default BooksList
