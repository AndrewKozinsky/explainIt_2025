// import { useParams } from 'next/navigation'
// import { pageUrls } from 'сonsts/pageUrls'
// import { RegularText, SmallGrayText } from './Texts'
// import { LinkButton } from './LinkButton'
// import LinkArrow from './LinkArrow'
// import { useGetPrevAndNextChapters } from './fn/prevAndNextChapters'
// import { useReadingStore } from '_pages/books/reading/readingStore'

/*export function BookLink() {
	const bookIdInUrl = useParams().bookId as string
	const book = useReadingStore((s) => s.book.data)

	return (
		<LinkButton href={pageUrls.books.book(bookIdInUrl).path}>
			<div className='book-and-prev-and-next-chapters__container'>
				{book.author && <SmallGrayText>{book.author}</SmallGrayText>}
				{book.name && <RegularText>{book.name}</RegularText>}
			</div>
		</LinkButton>
	)
}*/

/*export function PrevChapterLink() {
	const bookIdInUrl = useParams().bookId as string
	const prevChapter = useGetPrevAndNextChapters().prev
	if (!prevChapter) {
		return <span />
	}

	return (
		<LinkButton href={pageUrls.books.book(bookIdInUrl).chapter(prevChapter.id).reading.path}>
			<LinkArrow direction='left' />
			<div className='book-and-prev-and-next-chapters__container'>
				{prevChapter.name && <SmallGrayText>{prevChapter.name}</SmallGrayText>}
				{prevChapter.header && <RegularText>{prevChapter.header}</RegularText>}
			</div>
		</LinkButton>
	)
}*/

/*export function NextChapterLink() {
	const bookIdInUrl = useParams().bookId as string
	const nextChapter = useGetPrevAndNextChapters().next
	if (!nextChapter) {
		return <span />
	}

	return (
		<LinkButton href={pageUrls.books.book(bookIdInUrl).chapter(nextChapter.id).reading.path}>
			<div className='book-and-prev-and-next-chapters__container'>
				{nextChapter.name && <SmallGrayText>{nextChapter.name}</SmallGrayText>}
				{nextChapter.header && <RegularText>{nextChapter.header}</RegularText>}
			</div>
			<LinkArrow direction='right' />
		</LinkButton>
	)
}*/
