import { bookConfig } from '@/entites/books/lib/bookConfig'
import { BookChapterModel } from '@/entites/chapter/repository/ChaptersRepository'

export function getHeaderAndSubHeader(chapterData: BookChapterModel) {
	return {
		header: chapterData.header || bookConfig.emptyBookName,
		subHeader: chapterData.name,
	}
}
