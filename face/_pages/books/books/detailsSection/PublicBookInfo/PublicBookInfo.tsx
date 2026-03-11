// import { useParams } from 'next/navigation'
// import PublicMediaInfo from '_pages/bookAndVideoCommon/PublicMediaInfo/PublicMediaInfo'
// import { useBooksStore } from '_pages/books/books/booksStore'
// import { pageUrls } from 'сonsts/pageUrls'

/*export default function PublicBookInfo() {
	const urlBookId = useParams().bookId as string
	const publicBook = useBooksStore((s) => s.publicBook)

	if (!publicBook) {
		return null
	}

	const firstChapterUrl = pageUrls.books.book(urlBookId).chapter(publicBook.chapters[0].id).reading.path

	return (
		<PublicMediaInfo
			header={publicBook.name}
			subHeader={publicBook.author}
			coverUrls={publicBook.covers}
			text={publicBook.note}
			contentType='book'
			mediaUrl={firstChapterUrl}
		/>
	)
}*/
