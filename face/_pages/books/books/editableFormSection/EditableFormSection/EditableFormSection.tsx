import React from 'react'
import EditBookForm from '../editBook/EditBookForm/EditBookForm'
import EditChapterForm from '../editChapter/EditChapterForm/EditChapterForm'
import './EditableFormSection.scss'
import { booksFetcher } from '@/_pages/books/booksFetcher'

function EditableFormSection() {
	const currentBookId = booksFetcher.useGetCurrentBookIdFromUrl()
	if (!currentBookId) return null

	return (
		<div className='editable-form-section'>
			<EditBookForm />
			<EditChapterForm />
		</div>
	)
}

export default EditableFormSection
