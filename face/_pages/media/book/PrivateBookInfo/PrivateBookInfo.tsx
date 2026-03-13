import { bookConfig } from '_pages/media/commonComponents/bookConfig'
import ChaptersList from '_pages/media/commonComponents/ChaptersList/ChaptersList'
import MenuAndContentContainer from '_pages/media/commonComponents/MenuAndContentContainer/MenuAndContentContainer'
import { SectionWithHeader } from '_pages/media/commonComponents/SectionWithHeader/SectionWithHeader'
import EditBookForm from '../BookPage/editPrivateBook/EditPrivateBookForm/EditPrivateBookForm'
import { useBookStore } from '../bookStore'
import { createMediaIdUrl, pageUrls } from 'сonsts/pageUrls'
import './PrivateBookInfo.scss'

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
		const bookIdInUrl = createMediaIdUrl(bookId, 'private')

		return {
			name: chapter.header ?? bookConfig.emptyChapterName,
			subName: chapter.name,
			href: pageUrls.books.book(bookIdInUrl).chapter(chapter.id).path,
		}
	})

	return <ChaptersList chapters={chaptersConfig} />
}
