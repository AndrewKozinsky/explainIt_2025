import { useBooksStore } from '_pages/books/books/booksStore'
import ChapterLink from '../ChapterLink/ChapterLink'

function PrivateBookChaptersList({ bookId, bookType }: { bookId: number; bookType: 'private' | 'public' }) {
	const privateBook = useBooksStore((s) => s.privateBook)

	if (!privateBook || !privateBook.chapters.length) return null

	if (privateBook.id !== bookId || bookType !== 'private') {
		return null
	}

	return (
		<>
			{privateBook.chapters.map((chapter) => {
				return <ChapterLink bookId={privateBook.id} chapterData={chapter} bookType='private' key={chapter.id} />
			})}
		</>
	)
}

export default PrivateBookChaptersList
