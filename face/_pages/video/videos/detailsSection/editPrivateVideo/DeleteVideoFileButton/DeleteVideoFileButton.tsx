import DeleteEntityButtonAndModal from '@/ui/DeleteEntityButtonAndModal/DeleteEntityButtonAndModal'
import { useGetDeleteVideoFile } from './fn/getDeleteBook'

function DeleteVideoFileButton() {
	const { onDeleteFileClick, status } = useGetDeleteVideoFile()

	return (
		<DeleteEntityButtonAndModal
			deleteButtonText='Удалить файл...'
			onDeleteButtonClick={onDeleteFileClick}
			isDeleteButtonLoading={status === 'loading'}
			modal={{
				header: 'Удаление файла',
				content: 'Вы уверены, что хотите удалить файл?',
				confirmButtonText: 'Удалить файл',
			}}
		/>
	)
}

export default DeleteVideoFileButton
