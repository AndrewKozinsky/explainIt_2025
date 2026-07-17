import { pageUrls } from '@/shared/utils/pageUrls'
import ChaptersList from '_pages/media/commonComponents/ChaptersList/ChaptersList'
import { useBookStore } from '../bookStore'

function PublicBookChapters() {
	const book = useBookStore((s) => s.book)

	const bookId = book.data?.id
	const chapters = book.data?.chapters

	if (!bookId || !chapters || book.data?.type !== 'public') {
		return null
	}

	const chaptersConfig = chapters.map((chapter) => {
		return {
			name: chapter.header ?? undefined,
			subName: chapter.name ?? undefined,
			href: pageUrls.books.book(bookId).chapter(chapter.id).reading.path,
		}
	})

	return <ChaptersList chapters={chaptersConfig} />
}

export default PublicBookChapters
