import { pageUrls } from '@/shared/utils/pageUrls'
import { bookConfig } from '../../commonComponents/bookConfig'
import ChaptersList from '../../commonComponents/ChaptersList/ChaptersList'
import { useBookStore } from '../bookStore'

function PrivateBookChapters() {
	const book = useBookStore((s) => s.book)

	const bookId = book.data?.id
	const chapters = book.data?.chapters

	if (!bookId || !chapters || book.data?.type !== 'private') {
		return null
	}

	const chaptersConfig = chapters.map((chapter) => {
		return {
			name: chapter.header ?? bookConfig.emptyChapterName,
			subName: chapter.name ?? undefined,
			href: pageUrls.books.book(bookId).chapter(chapter.id).path,
		}
	})

	return <ChaptersList chapters={chaptersConfig} />
}

export default PrivateBookChapters
