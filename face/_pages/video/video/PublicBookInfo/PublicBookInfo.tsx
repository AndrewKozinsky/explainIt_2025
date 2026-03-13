// import MenuAndContentContainer from '_pages/bookAndVideoCommon/MenuAndContentContainer/MenuAndContentContainer'
// import { SectionWithHeader } from '_pages/bookAndVideoCommon/SectionWithHeader/SectionWithHeader'
// import ChaptersList from '_pages/books/books/chaptersSection/ChaptersList/ChaptersList'
// import { bookConfig } from '_pages/books/common/bookConfig'
// import { useBookStore } from '../bookStore'
// import PublicBookContentInfo from '../PublicBookContentInfo/PublicBookContentInfo'
// import { createMediaIdUrl, pageUrls } from 'сonsts/pageUrls'
// import './PublicBookInfo.scss'

/*export default function PublicBookInfo() {
	const publicBook = useBookStore((s) => s.publicBook)
	console.log(publicBook)

	if (!publicBook.data) {
		return null
	}

	return (
		<MenuAndContentContainer
			leftMenu={
				<SectionWithHeader title='Главы'>
					<PublicBookChapters />
				</SectionWithHeader>
			}
		>
			<PublicBookContentInfo />
		</MenuAndContentContainer>
	)
}*/

/*function PublicBookChapters() {
	const publicBook = useBookStore((s) => s.publicBook)

	const bookId = publicBook.data?.id
	const chapters = publicBook.data?.chapters

	if (!bookId || !chapters) {
		return null
	}

	const chaptersConfig = chapters.map((chapter) => {
		const bookIdInUrl = createMediaIdUrl(bookId, 'public')

		return {
			name: chapter.header ?? bookConfig.emptyChapterName,
			subName: chapter.name,
			href: pageUrls.books.book(bookIdInUrl).chapter(chapter.id).reading.path,
		}
	})

	return <ChaptersList chapters={chaptersConfig} />
}*/
