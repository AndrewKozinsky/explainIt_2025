import { createMediaIdUrl, pageUrls } from 'utils/pageUrls'
import { useChapterStore } from '_pages/media/chapter/chapterStore'
import { bookConfig } from '_pages/media/commonComponents/bookConfig'
import ChaptersList from '_pages/media/commonComponents/ChaptersList/ChaptersList'

function PrivateBookChapters() {
	const privateBook = useChapterStore((s) => s.privateBook)

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
