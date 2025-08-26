import React from 'react'
import Button from '../../../../ui/formRelated/buttons/Button/Button'
import { useGetOnAddBookClick } from './fn/getOnAddBookClick'

function AddBookButton() {
	const { onAddBookClick, status } = useGetOnAddBookClick()

	return (
		<Button icon='/icons/plusButtonIcon.svg' onClick={onAddBookClick} loading={status === 'loading'}>
			книгу
		</Button>
	)
}

export default AddBookButton
