import DeleteEntityButtonAndModal from '@/shared/ui/DeleteEntityButtonAndModal/DeleteEntityButtonAndModal'
import { TrashButtonIcon } from '@/shared/ui/icons/buttonIcons/TrashButtonIcon'
import { useDeleteBookCover } from './fn/useDeleteBookCover'

function DeleteBookCoverButton() {
	const { status, onDeleteClick } = useDeleteBookCover()

	return (
		<DeleteEntityButtonAndModal
			deleteButtonIcon={<TrashButtonIcon />}
			onDeleteButtonClick={onDeleteClick}
			isDeleteButtonLoading={status === 'loading'}
			modal={{
				header: 'Удаление обложки',
				content: 'Вы уверены, что хотите удалить обложку?',
				confirmButtonText: 'Удалить обложку',
			}}
		/>
	)
}

export default DeleteBookCoverButton
