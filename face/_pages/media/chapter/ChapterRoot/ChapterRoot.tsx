import { booksService } from '@/entities/book/BooksService'
import { bookConfig } from '@/entities/book/lib/bookConfig'
// import { BooksApi } from '@/entities/book/repository/BooksApi'
// import { ChaptersApi } from '@/entities/chapter/repository/ChaptersApi'
import { chaptersService } from '@/entities/chapter/ChaptersService'
import { MediaPageClient } from '@/entities/detailsBlock/SelectionProvider/MediaPageClient'
import Sentences from '@/entities/sentencesAndSubtitles/Sentences/Sentences'
import ErrorMessage from '@/shared/ui/ErrorMessage/ErrorMessage'
import { getChapterBreadCrumbsConfig } from './fn/getChapterBreadCrumbsItems'
import { getHeaderAndSubHeader } from './fn/getHeaderAndSubHeader'
import { getMediaNavigationData } from './fn/getMediaNavigationData'

type ChapterRootProps = {
	chapterId: number | string
	bookId: number | string
}

async function ChapterRoot(props: ChapterRootProps) {
	const { chapterId, bookId } = props

	const { error: bookError, data: book } = await booksService.getBook(Number(bookId))

	const { error: chapterError, data: chapter } = await chaptersService.getChapter(Number(chapterId))

	if (bookError) {
		return <ErrorMessage text={bookError} />
	}

	if (!book) {
		return <ErrorMessage text='Книга не найдена' />
	}

	if (chapterError) {
		return <ErrorMessage text={chapterError} />
	}

	if (!chapter) {
		return <ErrorMessage text='Глава не найдена' />
	}

	const { header, subHeader } = getHeaderAndSubHeader(chapter)
	const breadCrumbsConfig = getChapterBreadCrumbsConfig(bookId.toString(), book.name ?? bookConfig.emptyBookName)
	const mediaNavigation = getMediaNavigationData(book, chapter)

	return (
		<MediaPageClient
			breadCrumbsConfig={breadCrumbsConfig}
			header={header}
			subHeader={subHeader}
			leftBlock={<Sentences languageCode={book.languageCode} sentences={chapter.sentences ?? []} />}
			detailsBlockMetadata={{
				bookName: book.name,
				bookAuthor: book.author,
				chapterId: chapter.id,
				languageCode: book.languageCode,
				sentences: chapter.sentences,
			}}
			mediaNavigation={mediaNavigation}
		/>
	)
}

export default ChapterRoot
