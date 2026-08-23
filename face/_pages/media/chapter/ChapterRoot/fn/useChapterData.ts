// import { useQuery } from '@tanstack/react-query'
// import { booksQueries } from '@/entities/book/BooksQueryFacade'
// import { chaptersQueries } from '@/entities/chapter/ChaptersQueryFacade'

/**
 * Загружает данные книги и главы на клиенте для страницы главы.
 *
 * Возвращает данные в сыром виде: {@link undefined} — пока запрос выполняется,
 * {@link null} — объект не найден без ошибки (актуально для книги). Ошибки
 * возвращаются как читаемый текст, чтобы компонент сам решал, что показать.
 */
/*export function useChapterData(bookId: number, chapterId: number) {
	const bookQuery = useQuery(booksQueries.getBook(bookId))
	const chapterQuery = useQuery(chaptersQueries.getChapter(chapterId))

	return {
		book: bookQuery.data,
		chapter: chapterQuery.data,
		loading: bookQuery.isPending || chapterQuery.isPending,
		bookError: bookQuery.error ? bookQuery.error.message : null,
		chapterError: chapterQuery.error ? chapterQuery.error.message : null,
	}
}*/
