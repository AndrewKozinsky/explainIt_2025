// import DeleteEntityButtonAndModal from '@/shared/ui/DeleteEntityButtonAndModal/DeleteEntityButtonAndModal'
// import { TrashButtonIcon } from '@/shared/ui/icons/buttonIcons/TrashButtonIcon'
// import { useDeleteVideoFile } from './fn/getDeleteVideoFile'

/*type DeleteVideoFileButtonProps = {
	videoId: number
	onDeleted: () => void
}*/

/*function DeleteVideoFileButton(props: DeleteVideoFileButtonProps) {
	const { videoId, onDeleted } = props

	const { status, onDeleteClick } = useDeleteVideoFile(videoId, onDeleted)

	return (
		<DeleteEntityButtonAndModal
			deleteButtonText='Удалить файл...'
			deleteButtonIcon={<TrashButtonIcon />}
			onDeleteButtonClick={onDeleteClick}
			isDeleteButtonLoading={status === 'loading'}
			modal={{
				header: 'Удаление файла видео',
				content: 'Вы уверены, что хотите удалить файл видео?',
				confirmButtonText: 'Удалить',
			}}
		/>
	)
}*/

// export default DeleteVideoFileButton
