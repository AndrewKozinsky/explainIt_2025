import { pageUrls } from '@/shared/utils/pageUrls'
import { useBookStore } from '_pages/media/book/bookStore'
import { SummaryOfTheMedia } from '_pages/media/commonComponents/SummaryOfTheMedia/SummaryOfTheMedia'
import PublicBookInfoActions from '../PublicBookInfoActions/PublicBookInfoActions'
import './PublicBookContentInfo.scss'

export default function PublicBookContentInfo() {
	const book = useBookStore((s) => s.book)

	if (!book.data || book.data.type !== 'public') {
		return null
	}

	const coverUrl = book.data.coverUrl ?? undefined
	const firstChapterUrl = pageUrls.books.book(book.data.id).chapter(book.data.chapters[0].id).reading.path

	return (
		<div className='public-book-info'>
			{coverUrl && <img className='public-book-info__cover' src={coverUrl} alt='book cover' />}
			<SummaryOfTheMedia text={book.data.note ?? ''} />
			<PublicBookInfoActions bookUrl={firstChapterUrl} />
		</div>
	)
}
