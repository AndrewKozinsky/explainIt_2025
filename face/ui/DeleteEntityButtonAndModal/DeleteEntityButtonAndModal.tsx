import React from 'react'
import DeleteButton from 'ui/DeleteEntityButtonAndModal/DeleteButton'
import DeleteEntityModal from './DeleteEntityModal'

type DeleteEntityButtonAndModalProps = {
	deleteButtonText?: string
	deleteButtonIcon?: string | React.ReactNode
	// Функция, которая должна срабатывать при нажатии на кнопку удаления в модальном окне
	onDeleteButtonClick: () => Promise<void>
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
	const { deleteButtonText, deleteButtonIcon, onDeleteButtonClick, isDeleteButtonLoading, modal } = props

	const [isModalOpen, setIsModalOpen] = React.useState(false)

	return (
		<>
			<DeleteButton setIsModalOpen={setIsModalOpen} text={deleteButtonText} icon={deleteButtonIcon} />
			<DeleteEntityModal
				isModalOpen={isModalOpen}
				closeModal={() => setIsModalOpen(false)}
				onDeleteButtonClick={onDeleteButtonClick}
				isDeleteButtonLoading={isDeleteButtonLoading}
				modal={modal}
			/>
		</>
	)
}

export default DeleteEntityButtonAndModal
