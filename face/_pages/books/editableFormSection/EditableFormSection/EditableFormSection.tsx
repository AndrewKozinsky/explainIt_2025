import React from 'react'
import { booksLogic } from '../../booksLogic'
import EditBookForm from '../editBook/EditBookForm/EditBookForm'
import EditChapterForm from '../editChapter/EditChapterForm/EditChapterForm'
import './EditableFormSection.scss'

function EditableFormSection() {
	const currentBookId = booksLogic.useGetCurrentBookId()
	if (!currentBookId) return null

	return (
		<div className='editable-form-section'>
			<EditBookForm />
			<EditChapterForm />
		</div>
	)
}

export default EditableFormSection
