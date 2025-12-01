import { useBooksStore } from '_pages/books/books/booksStore'
import { useBook_GetBooksPublic, useBook_GetUserBooks } from '@/graphql'
// import { useBookChapter_Get } from '@/graphql'
import { useParams, usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { useUserStore } from 'stores/userStore'
import { createBookIdUrl, extractBookIdFromUrlBookId, getBookTypeByUrlBookId, pageUrls } from 'сonsts/pageUrls'

/** Наполняет Хранилище данными для начала работы */
export function usePopulateBooksStore() {
	useDefineCurrentPageType()
	useFetchPublicBooksAndSetToStore()
	useFetchPrivateBooksAndSetToStore()
	useSetBookToStore()
	// useFetchChapterAndSetToStore()
}

// Определяет тип текущей страницы и возвращает в виде типа
export function useDefineCurrentPageType() {
	const urlBookId = useParams().bookId as string
	const pathname = usePathname()

	// Важно: не обновляем Zustand-хранилище синхронно во время рендера,
	// чтобы избежать ошибки "Cannot update a component while rendering a different component".
	// Обновляем pageType внутри useEffect при изменении входных данных.
	useEffect(() => {
		const bookType = getBookTypeByUrlBookId(urlBookId)

		if (!urlBookId || !bookType) {
			useBooksStore.setState({
				pageUrlType: 'books',
			})
			return
		}

		if (pathname === pageUrls.books.book(urlBookId).path) {
			useBooksStore.setState({
				pageUrlType: 'book',
			})
		} else {
			useBooksStore.setState({
				pageUrlType: 'chapter',
			})
		}
	}, [urlBookId, pathname])
}

function useFetchPublicBooksAndSetToStore() {
	const { data, error, loading } = useBook_GetBooksPublic()

	useEffect(
		function () {
			if (loading) {
				useBooksStore.getState().updatePublicBooks({
					loading: true,
					errorMessage: null,
					data: [],
				})
			} else if (error) {
				useBooksStore.getState().updatePublicBooks({
					loading: false,
					errorMessage: error.message,
					data: [],
				})
			} else if (!data) {
				useBooksStore.getState().updatePublicBooks({
					loading: false,
					errorMessage: null,
					data: [],
				})
			} else {
				useBooksStore.getState().updatePublicBooks({
					loading: false,
					errorMessage: null,
					data: data.book_public_get_books,
				})
			}
		},
		[data, error, loading],
	)
}

function useFetchPrivateBooksAndSetToStore() {
	const { data, error, loading } = useBook_GetUserBooks()

	useEffect(
		function () {
			if (loading) {
				useBooksStore.getState().updatePrivateBooks({
					loading: true,
					errorMessage: null,
					data: [],
				})
			} else if (error) {
				useBooksStore.getState().updatePrivateBooks({
					loading: false,
					errorMessage: error.message,
					data: [],
				})
			} else if (!data) {
				useBooksStore.getState().updatePrivateBooks({
					loading: false,
					errorMessage: null,
					data: [],
				})
			} else {
				useBooksStore.getState().updatePrivateBooks({
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
	const publicBooks = useBooksStore((s) => s.publicBooks.data)
	const privateBooks = useBooksStore((s) => s.privateBooks.data)

	const bookIdWithPrefix = useParams().bookId
	const bookType = getBookTypeByUrlBookId(bookIdWithPrefix)

	useEffect(
		function () {
			const bookId = extractBookIdFromUrlBookId(bookIdWithPrefix)

			if (bookType === 'public' && publicBooks) {
				const publicBook = publicBooks.find((book) => book.id === bookId) ?? null

				useBooksStore.setState({
					publicBook,
					privateBook: null,
				})
			} else if (bookType === 'private' && privateBooks) {
				const privateBook = privateBooks.find((book) => book.id === bookId) ?? null

				useBooksStore.setState({
					publicBook: null,
					privateBook,
				})
			} else {
				useBooksStore.setState({
					publicBook: null,
					privateBook: null,
				})
			}
		},
		[publicBooks, privateBooks, bookIdWithPrefix, bookType],
	)
}

/*function useFetchChapterAndSetToStore() {
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
}*/
