import React from 'react'
import DeleteEntityButtonAndModal from '@/ui/DeleteEntityButtonAndModal/DeleteEntityButtonAndModal'
import { useGetDeleteBook } from './fn/getDeleteBook'

type DeleteBookButtonProps = {
	bookId: number
}

function DeleteBookButton(props: DeleteBookButtonProps) {
	const { bookId } = props

	const { onDeleteBookClick, status } = useGetDeleteBook(bookId)

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
