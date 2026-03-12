// import { useBooksStore } from '_pages/books/books/booksStore'
// import AddChapterButton from '../AddChapterButton/AddChapterButton'
// import PrivateBookChaptersList from '../PrivateBookChaptersList/PrivateBookChaptersList'
// import PublicBookChaptersList from '../PublicBookChaptersList/PublicBookChaptersList'
// import './ChaptersSection.scss'

/*function ChaptersSection({ bookId, bookType }: { bookId: number; bookType: 'private' | 'public' }) {
	const pageUrlType = useBooksStore((s) => s.pageUrlType)
	const publicBook = useBooksStore((s) => s.publicBook)
	const privateBook = useBooksStore((s) => s.privateBook)

	if (pageUrlType === 'books') {
		return null
	}

	if (!publicBook && !privateBook) {
		return null
	}

	if (publicBook) {
		return (
			<div className='chapters-section'>
				<PublicBookChaptersList bookType={bookType} bookId={bookId} />
			</div>
		)
	}

	return (
		<div className='chapters-section'>
			<PrivateBookChaptersList bookType={bookType} bookId={bookId} />
			{bookType === 'private' && (
				<div className='chapters-section__add-chapter-button'>
					<AddChapterButton bookType={bookType} />
				</div>
			)}
		</div>
	)
}*/

// export default ChaptersSection
