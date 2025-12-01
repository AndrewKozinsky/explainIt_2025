import ChapterLink from '../ChapterLink/ChapterLink'
import { useBooksStore } from '_pages/books/books/booksStore'

function PublicBookChaptersList() {
	const publicBook = useBooksStore((s) => s.publicBook)

	if (!publicBook || !publicBook.chapters.length) return null

	return (
		<>
			{publicBook.chapters.map((chapter) => {
				return <ChapterLink bookId={publicBook.id} chapterData={chapter} bookType='public' key={chapter.id} />
			})}
		</>
	)
}

export default PublicBookChaptersList
