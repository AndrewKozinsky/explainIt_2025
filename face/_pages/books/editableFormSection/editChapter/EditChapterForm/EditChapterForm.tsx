import React from 'react'
import { booksLogic } from '../../../booksLogic'

export default function EditChapterForm() {
	const currentChapterId = booksLogic.useGetCurrentChapterId()
	if (!currentChapterId) return null

	return <div>Chapter</div>
}
