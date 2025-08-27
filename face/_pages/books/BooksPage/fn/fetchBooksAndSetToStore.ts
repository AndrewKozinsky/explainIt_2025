import { useEffect } from 'react'
import { useBook_GetUserBooks } from '../../../../graphql'
import { useBooksStore } from '../../booksStore'

export function useGetFetchBooksAndSetToStore() {
	const { data, error, loading } = useBook_GetUserBooks()

	useEffect(
		function () {
			if (loading) {
				return
			}

			if (error || !data) {
				useBooksStore.setState({ booksError: 'Во время загрузки книг возникла ошибка' })
				return
			}

			useBooksStore.setState({ books: data.book_user_books })
		},
		[data, error, loading],
	)
}
