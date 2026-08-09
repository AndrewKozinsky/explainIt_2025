import { bookConfig } from '@/entities/book/lib/bookConfig'
import { BookChapterModel } from '@/entities/chapter/repository/ChaptersRepository'

export function getHeaderAndSubHeader(chapterData: BookChapterModel) {
	return {
		header: chapterData.header || bookConfig.emptyBookName,
		subHeader: chapterData.name,
	}
}
