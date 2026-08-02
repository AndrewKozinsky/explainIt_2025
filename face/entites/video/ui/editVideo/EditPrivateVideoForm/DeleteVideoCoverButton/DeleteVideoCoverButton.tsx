import type { VideoLiteModel } from '@/entites/videos/repository/VideosRepository'
import DeleteEntityButtonAndModal from '@/shared/ui/DeleteEntityButtonAndModal/DeleteEntityButtonAndModal'
import { TrashButtonIcon } from '@/shared/ui/icons/buttonIcons/TrashButtonIcon'
import { useDeleteVideoCover } from './useDeleteVideoCover'

type DeleteVideoCoverButtonProps = {
	videoId: number
	onDeleted: (video: VideoLiteModel) => void
}

function DeleteVideoCoverButton(props: DeleteVideoCoverButtonProps) {
	const { videoId, onDeleted } = props

	const { status, onDeleteClick } = useDeleteVideoCover(videoId, onDeleted)

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

export default DeleteVideoCoverButton
