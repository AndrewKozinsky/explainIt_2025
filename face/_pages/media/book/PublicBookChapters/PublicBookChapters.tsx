import { createMediaIdUrl, pageUrls } from 'utils/pageUrls'
import ChaptersList from '_pages/media/commonComponents/ChaptersList/ChaptersList'
import { useBookStore } from '../bookStore'

function PublicBookChapters() {
	const publicBook = useBookStore((s) => s.publicBook)

	const bookId = publicBook.data?.id
	const chapters = publicBook.data?.chapters

	if (!bookId || !chapters) {
		return null
	}

	const chaptersConfig = chapters.map((chapter) => {
		const bookIdInUrl = createMediaIdUrl(bookId, 'public')

		return {
			name: chapter.header,
			subName: chapter.name,
			href: pageUrls.books.book(bookIdInUrl).chapter(chapter.id).reading.path,
		}
	})

	return <ChaptersList chapters={chaptersConfig} />
}

export default PublicBookChapters
