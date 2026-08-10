// import DeleteEntityButtonAndModal from '@/shared/ui/DeleteEntityButtonAndModal/DeleteEntityButtonAndModal'
// import { TrashButtonIcon } from '@/shared/ui/icons/buttonIcons/TrashButtonIcon'
// import { useDeleteBookCover } from './fn/useDeleteBookCover'

/*type DeleteBookCoverButtonProps = {
	bookId: number
}*/

/*function DeleteBookCoverButton(props: DeleteBookCoverButtonProps) {
	const { bookId } = props

	const { status, onDeleteClick } = useDeleteBookCover(bookId)

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
}*/

// export default DeleteBookCoverButton
