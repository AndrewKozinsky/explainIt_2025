import DeleteEntityButtonAndModal from '@/shared/ui/DeleteEntityButtonAndModal/DeleteEntityButtonAndModal'
import { TrashButtonIcon } from '@/shared/ui/icons/buttonIcons/TrashButtonIcon'
import { useGetDeleteVideo } from './fn/getDeleteVideo'

type DeleteVideoButtonProps = {
	videoId: number
	onVideoDeleted: () => void
}

function DeleteVideoButton(props: DeleteVideoButtonProps) {
	const { videoId, onVideoDeleted } = props

	const { status, onDeleteClick } = useGetDeleteVideo(videoId, onVideoDeleted)

	return (
		<DeleteEntityButtonAndModal
			deleteButtonText='Удалить видео...'
			deleteButtonIcon={<TrashButtonIcon />}
			onDeleteButtonClick={onDeleteClick}
			isDeleteButtonLoading={status === 'loading'}
			modal={{
				header: 'Удаление видео',
				content: 'Вы уверены, что хотите удалить это видео? Это действие необратимо.',
				confirmButtonText: 'Удалить видео',
			}}
		/>
	)
}

export default DeleteVideoButton
