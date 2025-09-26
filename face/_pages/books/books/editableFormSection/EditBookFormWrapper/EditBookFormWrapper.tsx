import { booksFetcher } from '_pages/books/commonLogic/booksFetcher'
import React from 'react'
import Paragraph from 'ui/Paragraph/Paragraph'
import Spinner from 'ui/Spinner/Spinner'
import EditBookForm from '../editBook/EditBookForm/EditBookForm'

function EditBookFormWrapper() {
	const getBookRes = booksFetcher.useGetCurrentBook()

	if (getBookRes.status === 'loading') {
		return <Spinner />
	}
	if (getBookRes.status === 'noData') {
		return <Paragraph fontSize={16}>Книга не найдена</Paragraph>
	}
	if (getBookRes.status !== 'success' || !getBookRes.data) {
		return null
	}

	const book = getBookRes.data

	return <EditBookForm book={book} />
}

export default EditBookFormWrapper
