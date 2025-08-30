import { useEffect } from 'react'
import { useBookChapter_Get } from '../../../../../../graphql'
import { booksLogic } from '../../../../booksLogic'
import { useBooksStore } from '../../../../booksStore'

export function useFetchCurrentChapterAndSetToStore() {
	const chapterId = booksLogic.useGetCurrentChapterIdFromUrl()

	const { data, error, loading } = useBookChapter_Get({ variables: { input: { id: parseInt(chapterId) } } })

	useEffect(
		function () {
			if (loading) return

			if (error || !data) {
				useBooksStore.setState({ chapterFetchError: 'Во время загрузки главы возникла ошибка' })
				return
			}

			useBooksStore.getState().setChapter(data.book_chapter_get)
		},
		[data, error, loading],
	)
}
