import type { BookChapterLiteOutModel } from '@/shared/api/generated/models'
import { createMediaIdUrl, pageUrls } from '@/utils/pageUrls'
import { bookConfig } from '../../commonComponents/bookConfig'
import ChaptersList from '../../commonComponents/ChaptersList/ChaptersList'
import { useBookStore } from '../bookStore'

function PrivateBookChapters() {
	const privateBook = useBookStore((s) => s.privateBook)

	const bookId = privateBook.data?.id
	const chapters = privateBook.data?.chapters as unknown as BookChapterLiteOutModel[] | undefined

	if (!bookId || !chapters) {
		return null
	}

	const chaptersConfig = chapters.map((chapter) => {
		const bookIdInUrl = createMediaIdUrl(bookId, 'private')

		return {
			name: (chapter.header as unknown as string) ?? bookConfig.emptyChapterName,
			subName: chapter.name as unknown as string | undefined,
			href: pageUrls.books.book(bookIdInUrl).chapter(chapter.id).path,
		}
	})

	return <ChaptersList chapters={chaptersConfig} />
}

export default PrivateBookChapters
