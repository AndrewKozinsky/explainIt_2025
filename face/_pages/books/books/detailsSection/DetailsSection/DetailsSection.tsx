import { useBooksStore } from '_pages/books/books/booksStore'
import NoteText from '_pages/books/books/common/NoteText/NoteText'
import PublicBookInfo from '_pages/books/books/detailsSection/PublicBookInfo/PublicBookInfo'
// import EditChapterForm from '_pages/books/books/editableFormSection/editChapter/EditChapterForm/EditChapterForm'
import EditBookForm from '../editPrivateBook/EditPrivateBookForm/EditPrivateBookForm'

function DetailsSection() {
	const pageUrlType = useBooksStore((s) => s.pageUrlType)

	if (pageUrlType === 'books') {
		return <NoteText>Выберите книгу или главу для просмотра детальной информации.</NoteText>
	}

	return (
		<div className='editable-form-section'>
			<PublicBookInfo />
			<EditBookForm />
			{/*{pageUrlType === 'chapter' && <EditChapterForm />}*/}
		</div>
	)
}

export default DetailsSection
