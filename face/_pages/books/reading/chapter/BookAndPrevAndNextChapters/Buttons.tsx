import { useParams } from 'next/navigation'
import { useReadingStore } from '_pages/books/reading/readingStore'
import { useGetPrevAndNextChapters } from './fn/prevAndNextChapters'
import { LinkButton } from './LinkButton'
import { pageUrls } from 'сonsts/pageUrls'

export function BookLink() {
	const bookIdInUrl = useParams().bookId as string
	const book = useReadingStore((s) => s.book.data)

	return <LinkButton href={pageUrls.books.book(bookIdInUrl).path} smallText={book.author} text={book.name} />
}

export function PrevChapterLink() {
	const bookIdInUrl = useParams().bookId as string
	const prevChapter = useGetPrevAndNextChapters().prev

	if (!prevChapter) {
		return <span />
	}

	return (
		<LinkButton
			href={pageUrls.books.book(bookIdInUrl).chapter(prevChapter.id).reading.path}
			smallText={prevChapter.name}
			text={prevChapter.header}
		/>
	)
}

export function NextChapterLink() {
	const bookIdInUrl = useParams().bookId as string
	const nextChapter = useGetPrevAndNextChapters().next

	if (!nextChapter) {
		return <span />
	}

	return (
		<LinkButton
			href={pageUrls.books.book(bookIdInUrl).chapter(nextChapter.id).reading.path}
			smallText={nextChapter.name}
			text={nextChapter.header}
		/>
	)
}
