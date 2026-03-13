import React from 'react'
import DeleteEntityButtonAndModal from '@/ui/DeleteEntityButtonAndModal/DeleteEntityButtonAndModal'
import { useGetDeleteBook } from './fn/getDeleteBook'

function DeleteChapterButton() {
	const { onDeleteChapterClick, status } = useGetDeleteBook()

	return (
		<DeleteEntityButtonAndModal
			deleteButtonText='Удалить главу...'
			onDeleteButtonClick={onDeleteChapterClick}
			isDeleteButtonLoading={status === 'loading'}
			modal={{
				header: 'Удаление главы',
				content: 'Вы уверены, что хотите удалить главу?',
				confirmButtonText: 'Удалить главу',
			}}
		/>
	)
}

export default DeleteChapterButton
