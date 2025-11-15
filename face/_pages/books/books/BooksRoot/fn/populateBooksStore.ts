import { useBooksStore } from '_pages/books/books/booksStore'
import { useBook_GetUserBooks, useBookChapter_Get } from '@/graphql'
import { useParams, usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { pageUrls } from 'сonsts/pageUrls'

/** Наполняет Хранилище данными для начала работы */
export function usePopulateBooksStore() {
	useChangeCurrentPageType()
	useFetchBooksAndSetToStore()
	useSetBookToStore()
	useFetchChapterAndSetToStore()
}

// Определяет тип текущей страницы и возвращает в виде типа
export function useChangeCurrentPageType() {
	const bookId = useParams().bookId as string
	const pathname = usePathname()

	// Важно: не обновляем Zustand-хранилище синхронно во время рендера,
	// чтобы избежать ошибки "Cannot update a component while rendering a different component".
	// Обновляем pageType внутри useEffect при изменении входных данных.
	useEffect(() => {
		if (!bookId) {
			useBooksStore.setState({
				pageType: 'books',
			})
		} else if (pathname === pageUrls.books.book(bookId).path) {
			useBooksStore.setState({
				pageType: 'book',
			})
		} else {
			useBooksStore.setState({
				pageType: 'chapter',
			})
		}
	}, [bookId, pathname])
}

function useFetchBooksAndSetToStore() {
	const { data, error, loading } = useBook_GetUserBooks()

	useEffect(
		function () {
			if (loading) {
				useBooksStore.getState().updateBooks({
					loading: true,
					errorMessage: null,
					data: [],
				})
			} else if (error) {
				useBooksStore.getState().updateBooks({
					loading: false,
					errorMessage: error.message,
					data: [],
				})
			} else if (!data) {
				useBooksStore.getState().updateBooks({
					loading: false,
					errorMessage: null,
					data: [],
				})
			} else {
				useBooksStore.getState().updateBooks({
					loading: false,
					errorMessage: null,
					data: data.book_user_books,
				})
			}
		},
		[data, error, loading],
	)
}

function useSetBookToStore() {
	const booksData = useBooksStore((s) => s.books.data)
	const currentBookId = useParams().bookId as string

	useEffect(
		function () {
			if (!booksData || !booksData.length) {
				useBooksStore.setState({
					book: null,
				})
				return
			}

			const currentBook = booksData.find((book) => book.id.toString() === currentBookId) ?? null
			useBooksStore.setState({
				book: currentBook,
			})
		},
		[booksData, currentBookId],
	)
}

function useFetchChapterAndSetToStore() {
	const chapterId = useParams().chapterId as string

	const { data, error, loading } = useBookChapter_Get({
		variables: { input: { id: parseInt(chapterId) } },
		skip: !chapterId,
	})

	useEffect(
		function () {
			if (loading) {
				useBooksStore.getState().updateChapter({
					loading: true,
					errorMessage: null,
					data: null,
				})
			} else if (error) {
				useBooksStore.getState().updateChapter({
					loading: false,
					errorMessage: error.message,
					data: null,
				})
			} else if (!data) {
				useBooksStore.getState().updateChapter({
					loading: false,
					errorMessage: null,
					data: null,
				})
			} else {
				useBooksStore.getState().updateChapter({
					loading: false,
					errorMessage: null,
					data: data.book_chapter_get,
				})
			}
		},
		[data, error, loading],
	)
}
