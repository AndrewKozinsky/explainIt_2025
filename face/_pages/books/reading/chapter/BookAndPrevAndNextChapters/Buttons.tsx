import { useReadingStore } from '_pages/books/reading/readingStore'
import { pageUrls } from 'сonsts/pageUrls'
import { RegularText, SmallGrayText } from './Texts'
import { LinkButton } from './LinkButton'
import LinkArrow from './LinkArrow'
import { useGetPrevAndNextChapters } from './fn/prevAndNextChapters'

export function BookLink() {
	const book = useReadingStore((s) => s.book.data)

	return (
		<LinkButton href={pageUrls.books.book(book.id).path}>
			<div className='book-and-prev-and-next-chapters__container'>
				{book.author && <SmallGrayText>{book.author}</SmallGrayText>}
				{book.name && <RegularText>{book.name}</RegularText>}
			</div>
		</LinkButton>
	)
}

export function PrevChapterLink() {
	const book = useReadingStore((s) => s.book.data)
	const prevChapter = useGetPrevAndNextChapters().prev
	if (!prevChapter) return null

	return (
		<LinkButton href={pageUrls.books.book(book.id).chapter(prevChapter.id).reading.path}>
			<LinkArrow direction='left' />
			<div className='book-and-prev-and-next-chapters__container'>
				{prevChapter.name && <SmallGrayText>{prevChapter.name}</SmallGrayText>}
				{prevChapter.header && <RegularText>{prevChapter.header}</RegularText>}
			</div>
		</LinkButton>
	)
}

export function NextChapterLink() {
	const book = useReadingStore((s) => s.book.data)
	const nextChapter = useGetPrevAndNextChapters().next
	if (!nextChapter) return null

	return (
		<LinkButton href={pageUrls.books.book(book.id).chapter(nextChapter.id).reading.path}>
			<div className='book-and-prev-and-next-chapters__container'>
				{nextChapter.name && <SmallGrayText>{nextChapter.name}</SmallGrayText>}
				{nextChapter.header && <RegularText>{nextChapter.header}</RegularText>}
			</div>
			<LinkArrow direction='right' />
		</LinkButton>
	)
}
