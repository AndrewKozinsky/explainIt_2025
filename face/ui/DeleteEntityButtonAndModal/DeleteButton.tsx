import React from 'react'
import Button from 'ui/formRelated/buttons/Button/Button'

type DeleteButtonProps = {
	text?: string
	icon?: string | React.ReactNode
	setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

function DeleteButton(props: DeleteButtonProps) {
	const { text, icon, setIsModalOpen } = props

	return (
		<Button type='button' theme='danger' onClick={() => setIsModalOpen(true)} icon={icon}>
			{text}
		</Button>
	)
}

export default DeleteButton
