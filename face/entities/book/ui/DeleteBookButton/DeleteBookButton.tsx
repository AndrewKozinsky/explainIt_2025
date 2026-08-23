// import DeleteEntityButtonAndModal from '@/shared/ui/DeleteEntityButtonAndModal/DeleteEntityButtonAndModal'
// import { TrashButtonIcon } from '@/shared/ui/icons/buttonIcons/TrashButtonIcon'
// import { useGetDeleteBook } from './fn/getDeleteBook'

/*type DeleteBookButtonProps = {
	bookId: number
}*/

/*function DeleteBookButton(props: DeleteBookButtonProps) {
	const { bookId } = props

	const { onDeleteBookClick, status } = useGetDeleteBook(bookId)

	return (
		<DeleteEntityButtonAndModal
			deleteButtonText='Удалить книгу...'
			deleteButtonIcon={<TrashButtonIcon />}
			onDeleteButtonClick={onDeleteBookClick}
			isDeleteButtonLoading={status === 'loading'}
			modal={{
				header: 'Удаление книги',
				content: 'Вы уверены, что хотите удалить книгу?',
				confirmButtonText: 'Удалить книгу',
			}}
		/>
	)
}*/

// export default DeleteBookButton
