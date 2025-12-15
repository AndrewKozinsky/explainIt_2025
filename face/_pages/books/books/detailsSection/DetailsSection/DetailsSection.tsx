import { useBooksStore } from '_pages/books/books/booksStore'
import NoteText from '_pages/books/books/common/NoteText/NoteText'
import EditChapterForm from '../editChapter/EditChapterForm/EditChapterForm'
import PublicBookInfo from '_pages/books/books/detailsSection/PublicBookInfo/PublicBookInfo'
import EditBookForm from '../editPrivateBook/EditPrivateBookForm/EditPrivateBookForm'

function DetailsSection() {
	const pageUrlType = useBooksStore((s) => s.pageUrlType)
	const publicBook = useBooksStore((s) => s.publicBook)
	const privateBook = useBooksStore((s) => s.privateBook)

	if (pageUrlType === 'books') {
		return <NoteText>Выберите книгу или главу для просмотра детальной информации.</NoteText>
	}

	return (
		<div className='editable-form-section'>
			{pageUrlType === 'book' && publicBook && <PublicBookInfo />}
			{pageUrlType === 'book' && privateBook && <EditBookForm />}
			{pageUrlType === 'chapter' && <EditChapterForm />}
		</div>
	)
}

export default DetailsSection
