import MenuAndContentContainer from '_pages/bookAndVideoCommon/MenuAndContentContainer/MenuAndContentContainer'
import { SectionWithHeader } from '_pages/bookAndVideoCommon/SectionWithHeader/SectionWithHeader'
import ChaptersList from '_pages/books/books/chaptersSection/ChaptersList/ChaptersList'
import EditBookForm from '_pages/books/books/detailsSection/editPrivateBook/EditPrivateBookForm/EditPrivateBookForm'
import { bookConfig } from '_pages/books/common/bookConfig'
import { useBookStore } from '../bookStore'
import { createBookIdUrl, pageUrls } from 'сonsts/pageUrls'
import '_pages/books/book/PrivateBookInfo/PrivateBookInfo.scss'

export default function PrivateBookInfo() {
	const privateBook = useBookStore((s) => s.privateBook)

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
			<EditBookForm />
		</MenuAndContentContainer>
	)
}

function PrivateBookChapters() {
	const privateBook = useBookStore((s) => s.privateBook)

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
