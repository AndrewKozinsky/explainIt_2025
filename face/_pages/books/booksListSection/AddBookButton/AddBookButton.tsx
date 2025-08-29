import React, { useContext } from 'react'
import Button from '../../../../ui/formRelated/buttons/Button/Button'
import { NotificationContext } from '../../../../ui/Notification/context'
import { publicFolderFilesUrls } from '../../../../utils/publicFolderFilesUrls'
import { useGetOnAddBookClick } from './fn/getOnAddBookClick'

function AddBookButton() {
	const { onAddBookClick, status } = useGetOnAddBookClick()

	return (
		<Button
			icon={publicFolderFilesUrls.icons.plusButtonIcon}
			onClick={onAddBookClick}
			loading={status === 'loading'}
		>
			книгу
		</Button>
	)
}

export default AddBookButton
