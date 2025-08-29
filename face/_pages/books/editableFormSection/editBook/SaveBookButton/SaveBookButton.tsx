import React from 'react'
import Button from '../../../../../ui/formRelated/buttons/Button/Button'

// DELETE LATER
function SaveBookButton() {
	const onSaveBookChanges = () => {}

	return (
		<Button
			onClick={onSaveBookChanges}
			disabled
			// loading={status === 'loading'}
		>
			Сохранить
		</Button>
	)
}

export default SaveBookButton
