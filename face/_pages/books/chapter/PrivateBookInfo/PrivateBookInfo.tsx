import MenuAndContentContainer from '_pages/bookAndVideoCommon/MenuAndContentContainer/MenuAndContentContainer'
import { SectionWithHeader } from '_pages/bookAndVideoCommon/SectionWithHeader/SectionWithHeader'
import { useChapterStore } from '_pages/books/chapter/chapterStore'
import EditChapterForm from '_pages/books/chapter/editChapter/EditChapterForm/EditChapterForm'
import { bookConfig } from '_pages/books/common/bookConfig'
import ChaptersList from '_pages/books/common/ChaptersList/ChaptersList'
import { createBookIdUrl, pageUrls } from 'сonsts/pageUrls'

export default function PrivateChapterInfo() {
	const privateBook = useChapterStore((s) => s.privateBook)

	if (!privateBook.data) {
		return null
	}

	return (
		<MenuAndContentContainer
			leftMenu={
				<SectionWithHeader title='Главы'>
					<PrivateBookChapters />
				</SectionWithHeader>
			}
		>
			<EditChapterForm />
		</MenuAndContentContainer>
	)
}

function PrivateBookChapters() {
	const privateBook = useChapterStore((s) => s.privateBook)

	const bookId = privateBook.data?.id
	const chapters = privateBook.data?.chapters

	if (!bookId || !chapters) {
		return null
	}

	const chaptersConfig = chapters.map((chapter) => {
		const bookIdInUrl = createBookIdUrl(bookId, 'private')

		return {
			name: chapter.header ?? bookConfig.emptyChapterName,
			subName: chapter.name,
			href: pageUrls.books.book(bookIdInUrl).chapter(chapter.id).path,
		}
	})

	return <ChaptersList chapters={chaptersConfig} />
}
