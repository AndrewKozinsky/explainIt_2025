import { createMediaIdUrl, pageUrls } from '@/utils/pageUrls'
import { bookConfig } from '../../commonComponents/bookConfig'
import ChaptersList from '../../commonComponents/ChaptersList/ChaptersList'
import { useBookStore } from '../bookStore'

function PrivateBookChapters() {
	const privateBook = useBookStore((s) => s.privateBook)

	const bookId = privateBook.data?.id
	const chapters = privateBook.data?.chapters

	if (!bookId || !chapters) {
		return null
	}

	const chaptersConfig = chapters.map((chapter) => {
		const bookIdInUrl = createMediaIdUrl(bookId, 'private')

		return {
			name: chapter.header ?? bookConfig.emptyChapterName,
			subName: chapter.name,
			href: pageUrls.books.book(bookIdInUrl).chapter(chapter.id).path,
		}
	})

	return <ChaptersList chapters={chaptersConfig} />
}

export default PrivateBookChapters
