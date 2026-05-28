// import { SectionWithHeader } from '@/ui/SectionWithHeader/SectionWithHeader'
// import { useChapterStore } from '_pages/media/chapter/chapterStore'
// import EditChapterForm from '_pages/media/chapter/editChapter/EditChapterForm/EditChapterForm'
// import AddChapterButton from '_pages/media/commonComponents/AddChapterButton/AddChapterButton'
// import { bookConfig } from '_pages/media/commonComponents/bookConfig'
// import ChaptersList from '_pages/media/commonComponents/ChaptersList/ChaptersList'
// import MenuAndContentContainer from '_pages/media/commonComponents/MenuAndContentContainer/MenuAndContentContainer'
// import { createMediaIdUrl, pageUrls } from 'сonsts/pageUrls'

/*export default function PrivateChapterInfo() {
	const privateBook = useChapterStore((s) => s.privateBook)

	if (!privateBook.data) {
		return null
	}

	const bookId = privateBook.data.id
	const bookIdInUrl = createMediaIdUrl(bookId, 'private')

	return (
		<MenuAndContentContainer
			leftMenu={
				<SectionWithHeader title='Главы'>
					<PrivateBookChapters />
					<AddChapterButton bookId={bookId} bookIdInUrl={bookIdInUrl} />
				</SectionWithHeader>
			}
		>
			<EditChapterForm />
		</MenuAndContentContainer>
	)
}*/

/*function PrivateBookChapters() {
	const privateBook = useChapterStore((s) => s.privateBook)

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
}*/
