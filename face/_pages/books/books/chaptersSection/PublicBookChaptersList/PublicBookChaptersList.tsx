import { useBooksStore } from '_pages/books/books/booksStore'
import ChapterLink from '../ChapterLink/ChapterLink'

function PublicBookChaptersList({ bookId, bookType }: { bookId: number; bookType: 'private' | 'public' }) {
	const publicBook = useBooksStore((s) => s.publicBook)

	if (!publicBook || !publicBook.chapters.length) return null

	if (publicBook.id !== bookId || bookType !== 'public') {
		return null
	}

	return (
		<>
			{publicBook.chapters.map((chapter) => {
				return <ChapterLink bookId={publicBook.id} bookType='public' chapterData={chapter} key={chapter.id} />
			})}
		</>
	)
}

export default PublicBookChaptersList
