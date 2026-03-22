import DeleteEntityButtonAndModal from '@/ui/DeleteEntityButtonAndModal/DeleteEntityButtonAndModal'
import { useGetDeleteVideo } from '_pages/media/video/editPrivateVideo/DeleteVideoButton/fn/getDeleteVideo'

function DeleteVideoButton() {
	const { onDeleteVideoClick, status } = useGetDeleteVideo()

	return (
		<DeleteEntityButtonAndModal
			deleteButtonText='Удалить видео...'
			onDeleteButtonClick={onDeleteVideoClick}
			isDeleteButtonLoading={status === 'loading'}
			modal={{
				header: 'Удаление видео',
				content: 'Вы уверены, что хотите удалить видео?',
				confirmButtonText: 'Удалить видео',
			}}
		/>
	)
}

export default DeleteVideoButton
