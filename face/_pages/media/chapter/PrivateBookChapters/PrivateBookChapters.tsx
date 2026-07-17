// import {pageUrls} from "@/shared/utils/pageUrls";
// import { useChapterStore } from '_pages/media/chapter/chapterStore'
// import { bookConfig } from '_pages/media/commonComponents/bookConfig'
// import ChaptersList from '_pages/media/commonComponents/ChaptersList/ChaptersList'

/*function PrivateBookChapters() {
	const book = useChapterStore((s) => s.book)

	const bookId = book.data?.id
	const chapters = book.data?.chapters as unknown as
		| { id: number; header?: string; name?: string }[]
		| undefined

	if (!bookId || !chapters) {
		return null
	}

	const chaptersConfig = chapters.map((chapter) => {
		return {
			name: chapter.header ?? bookConfig.emptyChapterName,
			subName: chapter.name,
			href: pageUrls.books.book(bookId).chapter(chapter.id).path,
		}
	})

	return <ChaptersList chapters={chaptersConfig} />
}*/

// export default PrivateBookChapters
