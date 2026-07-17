// import { useParams } from 'next/navigation'
// import {pageUrls} from "@/shared/utils/pageUrls";
// import { getBookCoverUrl } from '_pages/media/reading/ReadingNavigation/fn/getBookCoverUrl'
// import { useReadingStore } from '../readingStore'
// import { useGetPrevAndNextChapters } from './fn/prevAndNextChapters'
// import { LinkButton } from './LinkButton'

/*export function BookLink() {
	const bookIdInUrl = useParams().bookId as string
	const book = useReadingStore((s) => s.book.data)
	const bookCoverUrl = getBookCoverUrl(book)

	return (
		<LinkButton
			href={pageUrls.books.book(bookIdInUrl).path}
			smallText={book.author as unknown as string | null | undefined}
			text={book.name as unknown as string | null | undefined}
			coverUrl={bookCoverUrl}
		/>
	)
}*/

/*export function PrevChapterLink() {
	const bookIdInUrl = useParams().bookId as string
	const prevChapter = useGetPrevAndNextChapters().prev

	if (!prevChapter) {
		return <div />
	}

	return (
		<LinkButton
			href={pageUrls.books.book(bookIdInUrl).chapter(prevChapter.id).reading.path}
			smallText={prevChapter.name as unknown as string | null | undefined}
			text={prevChapter.header as unknown as string | null | undefined}
		/>
	)
}*/

/*export function NextChapterLink() {
	const bookIdInUrl = useParams().bookId as string
	const nextChapter = useGetPrevAndNextChapters().next

	if (!nextChapter) {
		return <div />
	}

	return (
		<LinkButton
			href={pageUrls.books.book(bookIdInUrl).chapter(nextChapter.id).reading.path}
			smallText={nextChapter.name as unknown as string | null | undefined}
			text={nextChapter.header as unknown as string | null | undefined}
		/>
	)
}*/
