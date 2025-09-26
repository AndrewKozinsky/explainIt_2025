import EditChapterForm from '_pages/books/books/editableFormSection/editChapter/EditChapterForm/EditChapterForm'
import { booksFetcher } from '_pages/books/commonLogic/booksFetcher'
import React from 'react'
import Paragraph from 'ui/Paragraph/Paragraph'
import Spinner from 'ui/Spinner/Spinner'

function EditChapterFormWrapper() {
	const getChapterRes = booksFetcher.useGetCurrentChapter()

	if (getChapterRes.status === 'loading') {
		return <Spinner />
	}
	if (getChapterRes.status === 'noData') {
		return <Paragraph fontSize={16}>Глава не найдена</Paragraph>
	}
	if (getChapterRes.status !== 'success' || !getChapterRes.data) {
		return null
	}

	const chapter = getChapterRes.data

	return <EditChapterForm chapter={chapter} />
}

export default EditChapterFormWrapper
