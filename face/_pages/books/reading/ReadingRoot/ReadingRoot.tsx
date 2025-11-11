// import BookAuthorAndName from '_pages/books/reading/chapter/BookAuthorAndName/BookAuthorAndName'
// import { useClearSelectedSenteceAfterChapterWasChanged } from '_pages/books/reading/ReadingRoot/fn/clearSelectedSenteceAfterChapterWasChanged'
// import { useReadingStore } from '_pages/books/reading/readingStore'
// import RightPart from '_pages/books/reading/RightPart/RightPart'
// import { usePopulateReadingStore } from './fn/getContentStructure'
// import ChapterText from '../chapter/ChapterText/ChapterText'
// import BookAndPrevAndNextChapters from '../chapter/BookAndPrevAndNextChapters/BookAndPrevAndNextChapters'
// import ChapterName from '../chapter/ChapterName/ChapterName'
// import ChapterHeader from '../chapter/ChapterHeader/ChapterHeader'
// import './ReadingRoot.scss'

/*function ReadingRoot() {
	usePopulateReadingStore()
	useClearSelectedSenteceAfterChapterWasChanged()

	const bookData = useReadingStore((s) => s.book?.data)
	const populatedChapter = useReadingStore((s) => s.populatedChapter)
	if (!bookData || !populatedChapter) {
		return null
	}

	return (
		<div className='reading-root'>
			<div className='reading-root__chapter'>
				<BookAuthorAndName />
				<div className='reading-root__chapter-content'>
					<ChapterName />
					<ChapterHeader />
					<ChapterText />
					<BookAndPrevAndNextChapters />
				</div>
			</div>
			<div className='reading-root__hr' />
			<div className='reading-root__analysis'>
				<RightPart />
			</div>
		</div>
	)
}*/

// export default ReadingRoot
