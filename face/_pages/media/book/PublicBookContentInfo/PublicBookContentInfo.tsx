import { createMediaIdUrl, pageUrls } from 'utils/pageUrls'
import { useBookStore } from '_pages/media/book/bookStore'
import { SummaryOfTheMedia } from '_pages/media/commonComponents/SummaryOfTheMedia/SummaryOfTheMedia'
import PublicBookInfoActions from '../PublicBookInfoActions/PublicBookInfoActions'
import './PublicBookContentInfo.scss'

export default function PublicBookContentInfo() {
	const publicBook = useBookStore((s) => s.publicBook)

	if (!publicBook.data) {
		return null
	}

	const firstCoverImgUrl = publicBook.data?.covers?.[0]

	const bookId = createMediaIdUrl(publicBook.data.id, 'public')
	const firstChapterUrl = pageUrls.books.book(bookId).chapter(publicBook.data.chapters[0].id).reading.path

	return (
		<div className='public-book-info'>
			{firstCoverImgUrl && <img className='public-book-info__cover' src={firstCoverImgUrl} alt='book cover' />}
			<SummaryOfTheMedia text={publicBook.data.note} />
			<PublicBookInfoActions bookUrl={firstChapterUrl} />
		</div>
	)
}
