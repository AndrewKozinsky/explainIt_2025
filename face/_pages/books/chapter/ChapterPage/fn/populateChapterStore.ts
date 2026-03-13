import { useEffect } from 'react'
import { useParams } from 'next/navigation'
import { BookOutModel, useBook_Get, useBookChapter_Get } from '@/graphql'
import { useChapterStore } from '_pages/books/chapter/chapterStore'
import { extractMediaIdFromUrlBookId, getMediaTypeByUrlMediaId, pageUrls } from 'сonsts/pageUrls'

/** Наполняет Хранилище данными для начала работы */
export function usePopulateChapterStore() {
	useSetBookToStore()
	useFetchChapterAndSetToStore()
	useClearDataOnUnmount()
}

function useSetBookToStore() {
	const bookIdInUrl = useParams().bookId as string
	const bookType = getMediaTypeByUrlMediaId(bookIdInUrl)
	const bookId = extractMediaIdFromUrlBookId(bookIdInUrl)

	const {
		data: privateBookData,
		error: privateBookError,
		loading: privateBookLoading,
	} = useBook_Get({ variables: { input: { id: bookId! } }, skip: bookType !== 'private' })

	useEffect(
		function () {
			if (bookType !== 'private') return

			const book = privateBookData?.book_get

			if (privateBookLoading) {
				useChapterStore.getState().updatePrivateBook({
					loading: true,
					errorMessage: null,
					data: null as any as BookOutModel,
				})
			} else if (privateBookError) {
				useChapterStore.getState().updatePrivateBook({
					loading: false,
					errorMessage: privateBookError.message,
					data: null as any as BookOutModel,
				})
			} else if (!book) {
				useChapterStore.getState().updatePrivateBook({
					loading: false,
					errorMessage: null,
					data: null as any as BookOutModel,
				})
			} else {
				useChapterStore.getState().updatePrivateBook({
					loading: false,
					errorMessage: null,
					data: book,
				})
			}
		},
		[bookType, privateBookData, privateBookError, privateBookLoading],
	)
}

function useFetchChapterAndSetToStore() {
	const chapterId = useParams().chapterId as string

	const { data, error, loading } = useBookChapter_Get({
		variables: { input: { id: parseInt(chapterId), bookType: 'private' } },
		skip: !chapterId,
	})

	useEffect(
		function () {
			if (loading) {
				useChapterStore.getState().updateChapter({
					loading: true,
					errorMessage: null,
					data: null,
				})
			} else if (error) {
				useChapterStore.getState().updateChapter({
					loading: false,
					errorMessage: error.message,
					data: null,
				})
			} else if (!data) {
				useChapterStore.getState().updateChapter({
					loading: false,
					errorMessage: null,
					data: null,
				})
			} else {
				useChapterStore.getState().updateChapter({
					loading: false,
					errorMessage: null,
					data: data.book_chapter_get,
				})
			}
		},
		[data, error, loading],
	)
}

function useClearDataOnUnmount() {
	useEffect(function () {
		useChapterStore.getState().clearStore()
	}, [])
}
