import React from 'react'
import DeleteEntityButtonAndModal from '@/shared/ui/DeleteEntityButtonAndModal/DeleteEntityButtonAndModal'
import { TrashButtonIcon } from '@/shared/ui/icons/buttonIcons/TrashButtonIcon'

type DeleteCoverButtonProps = {
	isLoading: boolean
	onDelete: () => Promise<void>
}

function DeleteCoverButton(props: DeleteCoverButtonProps) {
	const { isLoading, onDelete } = props

	return (
		<DeleteEntityButtonAndModal
			deleteButtonIcon={<TrashButtonIcon />}
			onDeleteButtonClick={onDelete}
			isDeleteButtonLoading={isLoading}
			modal={{
				header: 'Удаление обложки',
				content: 'Вы уверены, что хотите удалить обложку?',
				confirmButtonText: 'Удалить обложку',
			}}
		/>
	)
}

export default DeleteCoverButton
