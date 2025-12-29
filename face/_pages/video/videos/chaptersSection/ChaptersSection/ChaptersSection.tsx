// import NoteText from '_pages/books/books/common/NoteText/NoteText'
// import AddChapterButton from '../AddChapterButton/AddChapterButton'
// import { useBooksStore } from '_pages/books/books/booksStore'
// import PublicBookChaptersList from '../PublicBookChaptersList/PublicBookChaptersList'
// import Paragraph from 'ui/Paragraph/Paragraph'
// import { SectionWithHeader } from '../../common/SectionWithHeader/SectionWithHeader'
// import PrivateBookChaptersList from '../PrivateBookChaptersList/PrivateBookChaptersList'

/*function ChaptersSection() {
	return (
		<SectionWithHeader title='Главы'>
			<Content />
		</SectionWithHeader>
	)
}*/

// export default ChaptersSection

/*function Content() {
	const pageUrlType = useBooksStore((s) => s.pageUrlType)
	const publicBook = useBooksStore((s) => s.publicBook)
	const privateBook = useBooksStore((s) => s.privateBook)

	if (pageUrlType === 'books') {
		return <NoteText>Выберите книгу для просмотра глав.</NoteText>
	}

	if (!publicBook && !privateBook) {
		return <Paragraph fontSize='15'>Запрошенной книги не существует.</Paragraph>
	}

	if (publicBook) {
		return <PublicBookChaptersList />
	}

	return (
		<>
			<PrivateBookChaptersList />
			<AddChapterButton />
		</>
	)
}*/
