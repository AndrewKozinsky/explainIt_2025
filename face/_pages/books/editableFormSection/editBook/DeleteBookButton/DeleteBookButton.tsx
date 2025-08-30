import React from 'react'
import DeleteEntityButtonAndModal from '../../../../../ui/DeleteEntityButtonAndModal/DeleteEntityButtonAndModal'
import { useGetDeleteBook } from './fn/getDeleteBook'

function DeleteBookButton() {
	const { onDeleteBookClick, status } = useGetDeleteBook()

	return (
		<DeleteEntityButtonAndModal
			onDeleteButtonClick={onDeleteBookClick}
			isDeleteButtonLoading={status === 'loading'}
			modal={{
				header: 'Удаление книги',
				content: 'Вы уверены, что хотите удалить книгу?',
				confirmButtonText: 'Удалить книгу',
			}}
		/>
	)
}

export default DeleteBookButton
