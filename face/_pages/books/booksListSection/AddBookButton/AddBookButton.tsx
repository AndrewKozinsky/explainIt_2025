import React, { useContext } from 'react'
import Button from '../../../../ui/formRelated/buttons/Button/Button'
import { NotificationContext } from '../../../../ui/Notification/context'
import { useGetOnAddBookClick } from './fn/getOnAddBookClick'

function AddBookButton() {
	const { notify } = useContext(NotificationContext)
	const { onAddBookClick, status } = useGetOnAddBookClick(notify)

	return (
		<Button icon='/icons/plusButtonIcon.svg' onClick={onAddBookClick} loading={status === 'loading'}>
			книгу
		</Button>
	)
}

export default AddBookButton
