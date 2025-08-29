import React from 'react'
import Button from '@/ui/formRelated/buttons/Button/Button'
import { publicFolderFilesUrls } from '@/utils/publicFolderFilesUrls'
import { useGetDeleteBook } from './fn/getDeleteBook'

function DeleteBookButton() {
	const { onDeleteBookClick, status } = useGetDeleteBook()

	return (
		<Button
			theme='danger'
			onClick={onDeleteBookClick}
			icon={publicFolderFilesUrls.icons.trashButtonIcon}
			loading={status === 'loading'}
		>
			Удалить книгу
		</Button>
	)
}

export default DeleteBookButton
