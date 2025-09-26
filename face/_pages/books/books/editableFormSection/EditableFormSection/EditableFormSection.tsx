import EditBookFormWrapper from '_pages/books/books/editableFormSection/EditBookFormWrapper/EditBookFormWrapper'
import { booksFetcher } from '_pages/books/commonLogic/booksFetcher'
import EditChapterFormWrapper from '../EditChapterFormWrapper/EditChapterFormWrapper'
import './EditableFormSection.scss'

function EditableFormSection() {
	const pageType = booksFetcher.useGetPageType()

	if (pageType === 'anotherPage') {
		return null
	}

	return (
		<div className='editable-form-section'>
			{pageType === 'bookPage' && <EditBookFormWrapper />}
			{pageType === 'chapterPage' && <EditChapterFormWrapper />}
		</div>
	)
}

export default EditableFormSection
