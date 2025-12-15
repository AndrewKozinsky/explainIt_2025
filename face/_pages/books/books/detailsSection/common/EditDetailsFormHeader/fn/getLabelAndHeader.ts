import { useBooksStore } from '_pages/books/books/booksStore'
import { bookConfig } from '_pages/books/books/common/bookConfig'

export function useGetLabelAndHeader() {
	const pageUrlType = useBooksStore((s) => s.pageUrlType)
	const privateBook = useBooksStore((s) => s.privateBook)
	const chapter = useBooksStore((s) => s.chapter)

	const bookName = privateBook?.name ? privateBook.name : bookConfig.emptyBookName
	const chapterName = chapter.data?.name ? chapter.data.name : bookConfig.emptyChapterName

	return {
		label: pageUrlType === 'book' ? 'Книга' : 'Глава',
		header: pageUrlType === 'book' ? bookName : chapterName,
	}
}
