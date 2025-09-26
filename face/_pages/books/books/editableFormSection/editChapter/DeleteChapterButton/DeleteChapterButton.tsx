import { BookChapterOutModel } from 'graphql'
import React from 'react'
import DeleteEntityButtonAndModal from '@/ui/DeleteEntityButtonAndModal/DeleteEntityButtonAndModal'
import { useGetDeleteBook } from './fn/getDeleteBook'

type DeleteChapterButtonProps = {
	chapter: BookChapterOutModel
}

function DeleteChapterButton(props: DeleteChapterButtonProps) {
	const { chapter } = props

	const { onDeleteChapterClick, status } = useGetDeleteBook(chapter)

	return (
		<DeleteEntityButtonAndModal
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
