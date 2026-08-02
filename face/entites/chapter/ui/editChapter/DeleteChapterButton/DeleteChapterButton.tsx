import DeleteEntityButtonAndModal from '@/shared/ui/DeleteEntityButtonAndModal/DeleteEntityButtonAndModal'
import { TrashButtonIcon } from '@/shared/ui/icons/buttonIcons/TrashButtonIcon'
import { useGetDeleteChapter } from './fn/getDeleteBook'

type DeleteChapterButtonProps = {
	chapterId: number
	onChapterDeleted: () => void
}

function DeleteChapterButton(props: DeleteChapterButtonProps) {
	const { chapterId, onChapterDeleted } = props

	const { onDeleteChapterClick, status } = useGetDeleteChapter(chapterId, onChapterDeleted)

	return (
		<DeleteEntityButtonAndModal
			deleteButtonText='Удаление главы...'
			deleteButtonIcon={<TrashButtonIcon />}
			onDeleteButtonClick={onDeleteChapterClick}
			isDeleteButtonLoading={status === 'loading'}
			modal={{
				header: 'Удаление главы',
				content: 'Вы уверены, что хотите удалить главу?',
				confirmButtonText: 'Удалить главу',
			}}
		/>
	)
}

export default DeleteChapterButton
