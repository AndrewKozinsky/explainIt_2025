import React from 'react'
import Button from '@/ui/formRelated/buttons/Button/Button'
import { publicFolderFilesUrls } from '@/utils/publicFolderFilesUrls'
import DeleteEntityModal from './DeleteEntityModal'

type DeleteEntityButtonAndModalProps = {
	// Функция, которая должна срабатывать при нажатии на кнопку удаления в модальном окне
	onDeleteBookClick: () => Promise<void>
	// Показывать ли загрузчик на кнопке удаления в мадальном окне
	isDeleteButtonLoading: boolean
	modal: {
		// Заголовок модального окна
		header: string
		// Текст модального окна
		content: string
		// Текст на кнопке удаления в модальном окне
		confirmButtonText: string
	}
}

// Этот компонент используется для отображения кнопки удаления и модального окна удаления
function DeleteEntityButtonAndModal(props: DeleteEntityButtonAndModalProps) {
	const { onDeleteBookClick, isDeleteButtonLoading, modal } = props

	const [isModalOpen, setIsModalOpen] = React.useState(false)

	return (
		<>
			<Button
				theme='danger'
				onClick={() => setIsModalOpen(true)}
				icon={publicFolderFilesUrls.icons.trashButtonIcon}
			>
				Удалить...
			</Button>
			<DeleteEntityModal
				isModalOpen={isModalOpen}
				closeModal={() => setIsModalOpen(false)}
				onDeleteButtonClick={onDeleteBookClick}
				isDeleteButtonLoading={isDeleteButtonLoading}
				modal={modal}
			/>
		</>
	)
}

export default DeleteEntityButtonAndModal
